def get_amount_str_value(amount: int, with_plus=False):
    suffixes = ['', 'k', 'kk']
    amount_str = '$'

    if amount < 1000:
        amount_str += str(amount)
    else:
        exp = min((len(str(amount)) - 1) // 3, len(suffixes) - 1)
        if amount % (10 ** (exp * 3)) == 0:
            normalized_amount = int(amount / (10 ** (exp * 3)))
        else:
            normalized_amount = amount / (10 ** (exp * 3))

        if exp == 0 and normalized_amount >= 100:
            amount_str += f'{int(normalized_amount)}{suffixes[exp]}'
        else:
            amount_str += f'{normalized_amount}{suffixes[exp]}'

    if with_plus:
        amount_str += '+'

    return amount_str


def get_budget_value(
        start_amount: int,
        secondary_amount: int = None
) -> str:
    if secondary_amount is None:
        return get_amount_str_value(start_amount, with_plus=True)
    return get_amount_str_value(start_amount) + '-' + get_amount_str_value(secondary_amount)
