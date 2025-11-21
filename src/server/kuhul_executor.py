"""
K'UHUL Glyph Executor
Executes K'UHUL symbolic programs with full glyph support

K'UHUL Glyphs:
- ⟁Pop - Initialize stack
- ⟁Wo - Work/push value
- ⟁Sek - Secure/execute function
- ⟁Ch'en - Chain/pipe result
- ⟁Yax - Yield/apply to
- ⟁K'ayab' - Loop/iterate
- ⟁Kumk'u - End loop
- ⟁Xul - Complete/terminate
"""

from typing import Any, Dict, List, Callable, Optional
from dataclasses import dataclass
import json


@dataclass
class ExecutionResult:
    """Result of K'UHUL execution"""
    success: bool
    result: Any
    stack: List[Any]
    variables: Dict[str, Any]
    operations: int
    error: Optional[str] = None

    def to_dict(self):
        return {
            "success": self.success,
            "result": self.result,
            "stack": self.stack,
            "variables": self.variables,
            "operations": self.operations,
            "error": self.error
        }


class KuhulExecutor:
    """K'UHUL Glyph Program Executor"""

    # Glyph mappings
    GLYPHS = {
        "⟁Pop": "initialize",
        "⟁Wo": "work",
        "⟁Sek": "execute",
        "⟁Ch'en": "chain",
        "⟁Yax": "yield",
        "⟁K'ayab'": "loop",
        "⟁Kumk'u": "end_loop",
        "⟁Xul": "terminate"
    }

    def __init__(self):
        self.stack: List[Any] = []
        self.variables: Dict[str, Any] = {}
        self.functions: Dict[str, Callable] = self._default_functions()
        self.operations = 0
        self.loop_stack: List[Dict] = []

    def _default_functions(self) -> Dict[str, Callable]:
        """Default built-in functions"""
        return {
            "http_get": lambda url: {"url": url, "method": "GET"},
            "xjson_parse": lambda data: json.loads(data) if isinstance(data, str) else data,
            "create_element": lambda html: {"type": "element", "html": html},
            "apply_styles": lambda styles: {"type": "styles", "styles": styles},
            "init_threejs": lambda canvas: {"type": "threejs", "canvas": canvas},
            "create_3d_viz": lambda data: {"type": "3d_viz", "data": data},
            "rotate": lambda obj: {"type": "rotate", "object": obj},
            "render": lambda scene: {"type": "render", "scene": scene},
            "animate": lambda fn: {"type": "animate", "function": fn},
            "add": lambda a, b: a + b,
            "multiply": lambda a, b: a * b,
            "concat": lambda a, b: str(a) + str(b),
        }

    def register_function(self, name: str, fn: Callable):
        """Register a custom function"""
        self.functions[name] = fn

    def parse(self, code: str) -> List[str]:
        """Parse K'UHUL code into tokens"""
        # Split by glyph markers
        tokens = []
        current = ""

        for char in code:
            if char == "⟁":
                if current.strip():
                    tokens.append(current.strip())
                current = "⟁"
            else:
                current += char

        if current.strip():
            tokens.append(current.strip())

        return [t for t in tokens if t]

    def execute(self, code: str) -> ExecutionResult:
        """Execute K'UHUL program"""
        try:
            tokens = self.parse(code)
            self.operations = 0

            for token in tokens:
                self.operations += 1
                self._execute_token(token)

            return ExecutionResult(
                success=True,
                result=self.stack[-1] if self.stack else None,
                stack=self.stack.copy(),
                variables=self.variables.copy(),
                operations=self.operations
            )

        except Exception as e:
            return ExecutionResult(
                success=False,
                result=None,
                stack=self.stack.copy(),
                variables=self.variables.copy(),
                operations=self.operations,
                error=str(e)
            )

    def _execute_token(self, token: str):
        """Execute a single token"""

        # ⟁Pop - Initialize stack
        if token == "⟁Pop":
            self.stack = []
            self.variables = {}

        # ⟁Wo - Push value to stack
        elif token.startswith("⟁Wo"):
            # Extract value (everything after ⟁Wo)
            parts = token.split("⟁Wo", 1)
            if len(parts) > 1:
                value = parts[1].strip()
                # Remove quotes if present
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                self.stack.append(value)

        # ⟁Sek - Execute function
        elif token.startswith("⟁Sek"):
            # Extract function name
            parts = token.split("⟁Sek", 1)
            if len(parts) > 1:
                fn_name = parts[1].strip()
                if fn_name in self.functions:
                    fn = self.functions[fn_name]
                    # Pop arguments based on function arity
                    try:
                        if len(self.stack) >= 2:
                            b = self.stack.pop()
                            a = self.stack.pop()
                            result = fn(a, b)
                        elif len(self.stack) >= 1:
                            arg = self.stack.pop()
                            result = fn(arg)
                        else:
                            result = fn()
                        self.stack.append(result)
                    except TypeError:
                        # Function doesn't match our calling convention
                        if len(self.stack) >= 1:
                            arg = self.stack.pop()
                            result = fn(arg)
                            self.stack.append(result)

        # ⟁Ch'en - Chain/pipe - Store result in variable
        elif token.startswith("⟁Ch'en"):
            parts = token.split("⟁Ch'en", 1)
            if len(parts) > 1:
                var_name = parts[1].strip()
                if self.stack:
                    self.variables[var_name] = self.stack[-1]

        # ⟁Yax - Yield/apply - Push variable to stack
        elif token.startswith("⟁Yax"):
            parts = token.split("⟁Yax", 1)
            if len(parts) > 1:
                var_name = parts[1].strip()
                if var_name in self.variables:
                    self.stack.append(self.variables[var_name])

        # ⟁K'ayab' - Loop start
        elif token.startswith("⟁K'ayab'"):
            parts = token.split("⟁K'ayab'", 1)
            if len(parts) > 1:
                loop_var = parts[1].strip()
                self.loop_stack.append({
                    "var": loop_var,
                    "position": self.operations
                })

        # ⟁Kumk'u - Loop end
        elif token == "⟁Kumk'u":
            if self.loop_stack:
                self.loop_stack.pop()

        # ⟁Xul - Terminate
        elif token == "⟁Xul":
            # Program complete
            pass

        # Plain variable reference
        elif token in self.variables:
            self.stack.append(self.variables[token])

        # Plain function call
        elif token in self.functions:
            fn = self.functions[token]
            if self.stack:
                arg = self.stack.pop()
                result = fn(arg)
                self.stack.append(result)

    def execute_file(self, filepath: str) -> ExecutionResult:
        """Execute K'UHUL program from file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            code = f.read()
        return self.execute(code)


# ============================================================================
# EXAMPLE K'UHUL PROGRAMS
# ============================================================================

EXAMPLE_PROGRAMS = {
    "dashboard": """⟁Pop⟁dashboard
⟁Wo⟁"api_url"⟁Sek⟁http_get⟁Sek⟁xjson_parse
⟁Ch'en⟁data
⟁Wo⟁"canvas"⟁Sek⟁init_threejs⟁Ch'en⟁scene
⟁Yax⟁data⟁Sek⟁create_3d_viz⟁Ch'en⟁viz
⟁K'ayab'⟁animate⟁Yax⟁viz⟁Sek⟁rotate⟁Yax⟁scene⟁Sek⟁render⟁Kumk'u
⟁Xul""",

    "math": """⟁Pop⟁calculator
⟁Wo⟁5⟁Ch'en⟁a
⟁Wo⟁3⟁Ch'en⟁b
⟁Yax⟁a⟁Yax⟁b⟁Sek⟁add⟁Ch'en⟁result
⟁Xul""",

    "render": """⟁Pop⟁render_dashboard
⟁Wo⟁"dashboard-container"⟁Ch'en⟁container
⟁Wo⟁"#16f2aa"⟁Ch'en⟁primary_color
⟁Wo⟁"#050814"⟁Ch'en⟁background_color
⟁Yax⟁container⟁Sek⟁create_element⟁dashboard_html
⟁Yax⟁primary_color⟁Sek⟁apply_styles
⟁Xul"""
}


# ============================================================================
# EXAMPLE USAGE
# ============================================================================

if __name__ == "__main__":
    print("\n⟁ K'UHUL GLYPH EXECUTOR - K'UHUL ASX FRAMEWORK\n")

    executor = KuhulExecutor()

    # Example 1: Dashboard program
    print("Example 1: Dashboard Visualization")
    print("-" * 60)
    result = executor.execute(EXAMPLE_PROGRAMS["dashboard"])
    print(f"Success: {result.success}")
    print(f"Operations: {result.operations}")
    print(f"Variables: {json.dumps(result.variables, indent=2)}")
    print(f"Result: {json.dumps(result.result, indent=2)}")

    # Example 2: Math program
    print("\n\nExample 2: Simple Math")
    print("-" * 60)
    executor2 = KuhulExecutor()
    # Register simple add function
    executor2.register_function("add", lambda a, b: float(a) + float(b))
    result2 = executor2.execute(EXAMPLE_PROGRAMS["math"])
    print(f"Success: {result2.success}")
    print(f"Variables: {result2.variables}")
    print(f"Result: {result2.result}")

    # Example 3: Render program
    print("\n\nExample 3: Render Dashboard")
    print("-" * 60)
    executor3 = KuhulExecutor()
    executor3.register_function("dashboard_html", lambda: "<div>Dashboard</div>")
    result3 = executor3.execute(EXAMPLE_PROGRAMS["render"])
    print(f"Success: {result3.success}")
    print(f"Operations: {result3.operations}")
    print(f"Variables: {json.dumps(result3.variables, indent=2)}")
