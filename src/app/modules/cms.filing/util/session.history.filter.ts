import { SessionHistoryCriteria } from "../model/session.history.criteria";


export class SessionHistoryFilter {
    public isValid(criteria: SessionHistoryCriteria): boolean {
        var isValidProvider: boolean = this.validProvider(criteria.provider);
        var isValidClient: boolean = this.validClient(criteria.client);
        var isValidInsuranceCompany: boolean = this.validInsuranceCompany(criteria.insuranceCompany);
        var isValidDateOfServiceRange: boolean = this.validDateOfServiceRange(criteria.dosStart_Date, criteria.dosEnd_Date);
        var isValidSubmitDateRange: boolean = this.validSubmitDateRange(criteria.submitStart_Date, criteria.submitEnd_Date);
        var isValidStatus: boolean = this.validStatus(criteria.selectedStatus)
        return isValidProvider || isValidClient || isValidInsuranceCompany || isValidDateOfServiceRange || isValidSubmitDateRange || isValidStatus;
    }
    private validProvider(provider: string): boolean {
        return provider !== undefined && provider !== null && provider !== '';
    }
    private validClient(client: string): boolean {
        return client !== undefined && client !== null && client !== '';
    }
    private validInsuranceCompany(insuranceCompany: string): boolean {
        return insuranceCompany !== undefined && insuranceCompany !== null && insuranceCompany !== '';
    }
    private validDateOfServiceRange(dosStart: Date, dosEnd: Date): boolean {
        var isStartDateSet: boolean = dosStart !== undefined && dosStart !== null;
        var isEndDateSet = dosEnd !== undefined && dosEnd !== null;
        return isStartDateSet || isEndDateSet;

    }
    private validSubmitDateRange(submitStart: Date, submitEnd: Date): boolean {
        var isStartDateSet: boolean = submitStart !== undefined && submitStart !== null;
        var isEndDateSet = submitEnd !== undefined && submitEnd !== null;
        return isStartDateSet || isEndDateSet;

    }
    private validStatus(selectedStatus: string[]): boolean {
        return selectedStatus !== undefined && selectedStatus !== null && selectedStatus.length > 0;
    }
}