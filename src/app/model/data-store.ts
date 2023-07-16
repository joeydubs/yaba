import { Accounts } from "./enums/accounts.enum"
import { Categories } from "./enums/categories.enums"
import { ExpenseType } from "./enums/expense-type.enum"
import { IAccount } from "./interfaces/account"
import { ICategory } from "./interfaces/category"
import { ICategoryGroup } from "./interfaces/category-group"
import { IBudgetLineItem } from "./interfaces/budget-line-item"
import { IMonthlyBudget } from "./interfaces/monthly-budget"
import { IStartingBalance } from "./interfaces/starting-balance"
import { ITransaction } from "./interfaces/transaction"
import { ILineItem } from "./interfaces/line-item"

export const lineItems: ILineItem[] = [
    { Id: 1, Name: 'Paycheck (10th)' },
    { Id: 2, Name: 'Paycheck (25th)' },
    { Id: 3, Name: 'Phones' },
    { Id: 4, Name: 'Internet' },
    { Id: 5, Name: 'Rent' },
    { Id: 6, Name: 'Only in June' },
]

export const budgetLineItems: IBudgetLineItem[] = [
    { Id: 1, MonthlyBudgetId: 1, AccountId: Accounts.WellsFargo, LineItemId: 1, LineItem: { Id: 1, Name: 'Paycheck (10th)' }, Planned: 2909.00, Actual: 0, CategoryId: Categories.Income, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 2, MonthlyBudgetId: 1, AccountId: Accounts.WellsFargo, LineItemId: 2, LineItem: { Id: 2, Name: 'Paycheck (25th)' }, Planned: 2909.00, Actual: 0, CategoryId: Categories.Income, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 3, MonthlyBudgetId: 1, AccountId: Accounts.WellsFargo, LineItemId: 3, LineItem: { Id: 3, Name: 'Phones' }, Planned: 198.73, Actual: 0, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 4, MonthlyBudgetId: 1, AccountId: Accounts.WellsFargo, LineItemId: 4, LineItem: { Id: 4, Name: 'Internet' }, Planned: 49.99, Actual: 0, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 5, MonthlyBudgetId: 1, AccountId: Accounts.WellsFargo, LineItemId: 5, LineItem: { Id: 5, Name: 'Rent' }, Planned: 900.00, Actual: 0, CategoryId: Categories.Home, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 6, MonthlyBudgetId: 2, AccountId: Accounts.WellsFargo, LineItemId: 1, LineItem: { Id: 1, Name: 'Paycheck (10th)' }, Planned: 2909.00, Actual: 0, CategoryId: Categories.Income, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 7, MonthlyBudgetId: 2, AccountId: Accounts.WellsFargo, LineItemId: 2, LineItem: { Id: 2, Name: 'Paycheck (25th)' }, Planned: 2909.00, Actual: 0, CategoryId: Categories.Income, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 8, MonthlyBudgetId: 2, AccountId: Accounts.WellsFargo, LineItemId: 3, LineItem: { Id: 3, Name: 'Phones' }, Planned: 198.73, Actual: 0, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 9, MonthlyBudgetId: 2, AccountId: Accounts.WellsFargo, LineItemId: 4, LineItem: { Id: 4, Name: 'Internet' }, Planned: 49.99, Actual: 0, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 10, MonthlyBudgetId: 2, AccountId: Accounts.WellsFargo, LineItemId: 6, LineItem: { Id: 6, Name: 'Only in June' }, Planned: 129, Actual: 0, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
    { Id: 11, MonthlyBudgetId: 2, AccountId: Accounts.WellsFargo, LineItemId: 5, LineItem: { Id: 5, Name: 'Rent' }, Planned: 900.00, Actual: 0, CategoryId: Categories.Home, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
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
    { Id: 1, MonthlyBudgetId: 1, Category: categories.find((c) => c.Id === Categories.Income)!, LineItems: budgetLineItems.filter((li) => li.CategoryId === Categories.Income && li.MonthlyBudgetId === 1) },
    { Id: 2, MonthlyBudgetId: 1, Category: categories.find((c) => c.Id === Categories.Home)!, LineItems: budgetLineItems.filter((li) => li.CategoryId === Categories.Home && li.MonthlyBudgetId === 1) },
    { Id: 3, MonthlyBudgetId: 1, Category: categories.find((c) => c.Id === Categories.Personal)!, LineItems: budgetLineItems.filter((li) => li.CategoryId === Categories.Personal && li.MonthlyBudgetId === 1) },
    { Id: 4, MonthlyBudgetId: 2, Category: categories.find((c) => c.Id === Categories.Income)!, LineItems: budgetLineItems.filter((li) => li.CategoryId === Categories.Income && li.MonthlyBudgetId === 2) },
    { Id: 5, MonthlyBudgetId: 2, Category: categories.find((c) => c.Id === Categories.Home)!, LineItems: budgetLineItems.filter((li) => li.CategoryId === Categories.Home && li.MonthlyBudgetId === 2) },
    { Id: 6, MonthlyBudgetId: 2, Category: categories.find((c) => c.Id === Categories.Personal)!, LineItems: budgetLineItems.filter((li) => li.CategoryId === Categories.Personal && li.MonthlyBudgetId === 2) },
]

export const startingBalances: IStartingBalance[] = [
    { MonthlyBudgetId: 1, AccountId: Accounts.WellsFargo, Account: { Id: Accounts.WellsFargo, Name: 'Wells Fargo' }, Amount: 0.00 },
    { MonthlyBudgetId: 1, AccountId: Accounts.Aspiration, Account: { Id: Accounts.Aspiration, Name: 'Aspiration' }, Amount: 0.00 },
]

export const monthlyBudgets: IMonthlyBudget[] = [
    { Id: 1, Date: new Date('2023-05-01'), StartingBalances: startingBalances.filter((sb) => sb.MonthlyBudgetId === 1) },
    { Id: 2, Date: new Date('2023-06-01'), StartingBalances: startingBalances.filter((sb) => sb.MonthlyBudgetId === 1) },
]

export const transactions: ITransaction[] = []