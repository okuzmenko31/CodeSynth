class BudgetConverter:
    """
    Class to convert budget values to a more readable format.
    For example: 5000, 10000 -> $5k-$10k
    """

    @staticmethod
    def _format_value(value: int):
        if value < 1000:
            return f"${value}"
        elif value < 1000000:
            return f"${value // 1000}k"
        else:
            return f"${value // 1000000}kk"

    @classmethod
    def convert_budget(cls, value_from: int, value_to: int = None):
        if value_to:
            return f"{cls._format_value(value_from)}-{cls._format_value(value_to)}"
        else:
            return f"{cls._format_value(value_from)}+"
