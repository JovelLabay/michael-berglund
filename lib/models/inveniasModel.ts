
export interface People {

    NameComponents: NameComponents,
    HomeAddress: HomeAddress,
    EmailAddresses: EmailAddress[],
    PhoneNumbers: PhoneNumber[],
    CustomFreeTextFields?: CustomFreeTextField[]
    Websites: Website[]
    IsClient?: boolean,
    IsPartner?: boolean,  
    IsCandidate?: boolean,
    IsSupplier?: boolean,
    IsPermanentCandidate?: boolean,
    IsInterimCandidate?: boolean,
    IsNonExecCandidate?: boolean,
}

export interface NameComponents {
    FullName?: string
    FamilyName: string
    FirstName: string
    MiddleName?: string
    Suffix?: string
    Title?: string
    Nickname?: string
    MaidenName?: string
}

export interface HomeAddress {
    FullAddress?: string,
    PreferredDisplayOrderIndex?: number,
    GeocodingSupportEnabled?: boolean,
    Street?: string,
    TownCity?: string,
    County?: string,
    Postcode?: string,
    Country?: string

}
export interface EmailAddress {
    IsPersonal: boolean,
    IsBusiness: true,
    PreferredDisplayOrderIndexLegacy: number
    PreferredDisplayOrderIndex: number
    IsVisibleAsDefault: true
    FieldName: | 'Email1Address' | string
    DisplayTitle?: string
    ItemValue:  string
}


export interface PhoneNumber {
    IsPrimary: boolean,
    PreferredDisplayOrderIndexLegacy: number,
    PreferredDisplayOrderIndex: number,
    PhoneNumberComponents: {},
    IsVisibleAsDefault: true,
    FieldName: 'MobilePhone' | 'DirectLine',
    DisplayTitle: 'Mobile' | 'Direct Line' | string,
    ItemValue: string
}


export interface CustomFreeTextField {
    FieldName: 'linkedin' | 'privacy' | 'newsletter' | any
    DisplayTitle:'Linkedin' | 'Accept Privacy' | 'Allow Newsletter' | any 
    ItemValue: any
}


export interface  Website 
{
    IsCustomWebsite: false | boolean,
    Icon: string,
    IsVisibleAsDefault: true,
    FieldName: 'LinkedIn' | any,
    DisplayTitle: 'LinkedIn' | any,
    ItemValue: string
}