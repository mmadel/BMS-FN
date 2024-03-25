import { sessionHistoryCriteria } from "../model/session.history.criteria";

export class sessionHistoryFilter {
    public isValid(criteria: sessionHistoryCriteria): boolean {
        var isValidProvider: boolean = this.validProvider(criteria.provider);
        var isValidClient: boolean = this.validClient(criteria.client);
        var isValidInsuranceCompany: boolean = this.validInsuranceCompany(criteria.insuranceCompany);
        var isValidDateOfServiceRange: boolean = this.validDateOfServiceRange(criteria.dosStart, criteria.dosEnd);
        var isValidSubmitDateRange: boolean = this.validSubmitDateRange(criteria.dosStart, criteria.dosEnd);
        return isValidProvider || isValidClient || isValidInsuranceCompany || isValidDateOfServiceRange || isValidSubmitDateRange;
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
}