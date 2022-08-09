import {
    CustomFreeTextField, EmailAddress, HomeAddress, NameComponents, People, PhoneNumber, Website
} from "@models/inveniasModel"

const jobPosition = (data: any) => {
  let result: any = {}
  switch (data) {
    case "executive":
      result = {
        IsClient: true,
        IsPartner: false,
        IsCandidate: true,
        IsSupplier: false,
        IsPermanentCandidate: true,
        IsInterimCandidate: false,
        IsNonExecCandidate: false,
      }
      break
    case "interim":
      result = {
        IsClient: true,
        IsPartner: false,
        IsCandidate: true,
        IsSupplier: false,
        IsPermanentCandidate: false,
        IsInterimCandidate: true,
        IsNonExecCandidate: false,
      }
      break
    case "internal":
      result = {
        IsClient: false,
        IsPartner: false,
        IsCandidate: true,
        IsSupplier: false,
        IsPermanentCandidate: false,
        IsInterimCandidate: false,
        IsNonExecCandidate: false,
      }
      break
    default: result = {};
      break
  }
  return result;
}

const mapperInvenias = {
  dataPeopleMapper: (data: any) => {

    const jobPositions = jobPosition(data.type);

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
    const websites: Website[] = [
      {
        IsCustomWebsite: false,
        Icon: "",
        IsVisibleAsDefault: true,
        FieldName: "LinkedIn",
        DisplayTitle: "LinkedIn",
        ItemValue: data.linkedIn,
      },
    ]
    const people: People = {
      NameComponents: nameComponent,
      HomeAddress: homeAddress,
      EmailAddresses: emailAddress,
      PhoneNumbers: phoneNumbers,
      Websites: websites,
      ...jobPositions,
    }
    return people
  },
}

export default mapperInvenias
