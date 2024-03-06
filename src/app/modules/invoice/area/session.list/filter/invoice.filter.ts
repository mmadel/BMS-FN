import { FilterModel } from "./filter.model";

export class InvoiceFilter {

    public isValid(filterModel: FilterModel): boolean {
        var isValidProvider: boolean = this.validProviderFilterData(filterModel.provider)
        var isValidSessionCase: boolean = this.validSessionCaseFilterData(filterModel.sessionCase)
        var isValidDateRange: boolean = this.validDateRangeFilterData(filterModel.searchStartDate, filterModel.searchEndDate);
        return isValidProvider || isValidSessionCase || isValidDateRange;
    }


    private validProviderFilterData(provider: string): boolean {
        return provider !== undefined && provider !== null && provider !== '';
    }

    private validSessionCaseFilterData(sessionCase: string): boolean {
        return sessionCase !== undefined && sessionCase !== null && sessionCase !== '';
    }

    private validDateRangeFilterData(searchStartDate: Date, searchEndtDate: Date): boolean {
        var isStartDateSet: boolean = searchStartDate !== undefined && searchStartDate !== null;
        var isEndDateSet = searchEndtDate !== undefined && searchEndtDate !== null;
        return isStartDateSet || isEndDateSet;
    }
}