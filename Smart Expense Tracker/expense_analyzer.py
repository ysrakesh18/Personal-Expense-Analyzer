# Personal Expense Analyzer
# Python component of the project


expenses = [
    {"name": "Lunch", "amount": 250, "category": "Food"},
    {"name": "Bus", "amount": 50, "category": "Travel"},
    {"name": "Notebook", "amount": 120, "category": "Education"},
    {"name": "Movie", "amount": 300, "category": "Entertainment"},
    {"name": "Shopping", "amount": 800, "category": "Shopping"},
]


def calculate_total(expenses):

    total = 0

    for expense in expenses:
        total += expense["amount"]

    return total


def calculate_average(expenses):

    if len(expenses) == 0:
        return 0

    total = calculate_total(expenses)

    return total / len(expenses)


def category_summary(expenses):

    categories = {}

    for expense in expenses:

        category = expense["category"]

        amount = expense["amount"]

        if category not in categories:

            categories[category] = 0

        categories[category] += amount

    return categories


def highest_category(expenses):

    summary = category_summary(expenses)

    if not summary:
        return None

    return max(
        summary,
        key=summary.get
    )


# Program

print("=" * 40)

print("PERSONAL EXPENSE ANALYZER")

print("=" * 40)


total = calculate_total(expenses)

average = calculate_average(expenses)

summary = category_summary(expenses)

highest = highest_category(expenses)


print(f"\nTotal Spending: ₹{total}")

print(f"Average Expense: ₹{average:.2f}")

print("\nSpending by Category:")


for category, amount in summary.items():

    print(f"{category}: ₹{amount}")


print(
    f"\nHighest Spending Category: {highest}"
)

print("\nAnalysis completed successfully.")
