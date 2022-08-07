import {
    CustomFreeTextField, EmailAddress, HomeAddress, NameComponents, People, PhoneNumber
} from "@models/inveniasModel"

const mapperInvenias = {
  dataPeopleMapper: (data: any) => {

    const nameComponent: NameComponents = {
      FullName: data.firstName + " " + data.lastName,
      FamilyName: data.lastName,
      FirstName: data.firstName,
      MiddleName: "",
      Suffix: "",
      Title: "",
      Nickname: "",
      MaidenName: "",
    }
    const homeAddress: HomeAddress = {
      FullAddress: data.city,
      PreferredDisplayOrderIndex: 0,
      GeocodingSupportEnabled: true,
      Street: "",
      TownCity: data.city,
      County: "",
      Postcode: "",
      Country: "",
    }
    const emailAddress: EmailAddress[] = [
      {
        IsPersonal: true,
        IsBusiness: true,
        PreferredDisplayOrderIndexLegacy: 0,
        PreferredDisplayOrderIndex: 2,
        IsVisibleAsDefault: true,
        FieldName: "Email1Address",
        DisplayTitle: "Email",
        ItemValue: data.email,
      },
    ]
    const phoneNumbers: PhoneNumber[] = [
      {
        IsPrimary: true,
        PreferredDisplayOrderIndexLegacy: 0,
        PreferredDisplayOrderIndex: 0,
        PhoneNumberComponents: {},
        IsVisibleAsDefault: true,
        FieldName: "MobilePhone",
        DisplayTitle: "Mobile",
        ItemValue: data.phone,
      },
      {
        IsPrimary: false,
        PreferredDisplayOrderIndexLegacy: 1,
        PreferredDisplayOrderIndex: 1,
        PhoneNumberComponents: {},
        IsVisibleAsDefault: true,
        FieldName: "DirectLine",
        DisplayTitle: "Direct Line",
        ItemValue: data.phone,
      },
    ]
    const CustomFreeTextFields: CustomFreeTextField[] = [
      {
        FieldName: "linkedin",
        DisplayTitle: "Linkedin",
        ItemValue: data.linkedIn,
      },
    ]

    const people: People = {
      NameComponents: nameComponent,
      HomeAddress: homeAddress,
      EmailAddresses: emailAddress,
      PhoneNumbers: phoneNumbers,
      CustomFreeTextFields: CustomFreeTextFields,
    }
    return people
  }
}

export default mapperInvenias;