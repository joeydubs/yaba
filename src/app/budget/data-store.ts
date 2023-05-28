import { Accounts } from "@model/enums/accounts.enum"
import { Categories } from "@model/enums/categories.enums"
import { ExpenseType } from "@model/enums/expense-type.enum"
import { IAccount } from "@model/interfaces/account"
import { ICategory } from "@model/interfaces/category"
import { ICategoryGroup } from "@model/interfaces/category-group"
import { ILineItem } from "@model/interfaces/line-item"
import { IMonthlyBudget } from "@model/interfaces/monthly-budget"

export const lineItems: ILineItem[] = [
    { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Paycheck (10th)', Planned: 2909.00, Actual: 0.00, CategoryId: Categories.Income, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 2, AccountId: Accounts.WellsFargo, Name: 'Paycheck (25th)', Planned: 2909.00, Actual: 0.00, CategoryId: Categories.Income, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 3, AccountId: Accounts.WellsFargo, Name: 'Phones', Planned: 198.73, Actual: 0, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 4, AccountId: Accounts.WellsFargo, Name: 'Internet', Planned: 49.99, Actual: 49.99, CategoryId: Categories.Personal, Allocated: true, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 5, AccountId: Accounts.WellsFargo, Name: 'Rent', Planned: 900.00, Actual: 0, CategoryId: Categories.Home, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
]

export const accounts: IAccount[] = [
    { Id: Accounts.WellsFargo, Name: 'Wells Fargo' },
    { Id: Accounts.Aspiration, Name: 'Aspiration' },
]
export const categories: ICategory[] = [
    { Id: Categories.Income, Name: 'Income', ExpenseTypeId: ExpenseType.Income },
    { Id: Categories.Home, Name: 'Home', ExpenseTypeId: ExpenseType.Expense },
    { Id: Categories.Personal, Name: 'Personal', ExpenseTypeId: ExpenseType.Expense },
]

export const categoryGroups: ICategoryGroup[] = [
    { Category: categories.find((c) => c.Id === Categories.Income)!, LineItems: lineItems.filter((li) => li.CategoryId === Categories.Income) },
    { Category: categories.find((c) => c.Id === Categories.Home)!, LineItems: lineItems.filter((li) => li.CategoryId === Categories.Home) },
    { Category: categories.find((c) => c.Id === Categories.Personal)!, LineItems: lineItems.filter((li) => li.CategoryId === Categories.Personal) },
]

export const monthlyBudgets: IMonthlyBudget[] = [
    {
        Id: 1, Date: new Date('05-01-2023'), StartingBalances: [
            { MonthlyBudgetId: 1, AccountId: Accounts.WellsFargo, Account: { Id: Accounts.WellsFargo, Name: 'Wells Fargo' }, Amount: 0.00 },
            { MonthlyBudgetId: 1, AccountId: Accounts.Aspiration, Account: { Id: Accounts.Aspiration, Name: 'Aspiration' }, Amount: 0.00 },
        ]
    }
]