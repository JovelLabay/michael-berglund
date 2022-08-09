import {
    CustomFreeTextField, EmailAddress, HomeAddress, NameComponents, People, PhoneNumber
} from "@models/inveniasModel"

const API_URL =  process.env.URL_ROOT;
const API_URL_AUTH =  process.env.URL_AUTH;
const URL_API =  process.env.URL_API;

const AUTH_CREDENTIALS = (): any => {
    const objectRequest: any =  { 
        client_id:  process.env.CLIENT_ID, 
        password: process.env.PASSWORD_INVENIAS, 
        client_secret: process.env.CLIENT_SECRET, 
        grant_type:process.env.GRANT_TYPE, 
        scope:process.env.SCOPE,
        username:process.env.USERNAME_INVENIAS,
    }
    return FormURLParse(objectRequest);
}

const authHeaders = (token: any) => {
    return {
        'authorization': token ? `bearer ${token}` : 'public'
    }
}

export const makeid = (length: number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() *  charactersLength));
   }
   return result;
}


export const FormURLParse =(objectRequest: any): any => {
    let formBody: any = [];
    for (const property in objectRequest) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(objectRequest[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}



const httpInvenias  = {
  
    auth: async () => {
        return fetch(`${API_URL}/${API_URL_AUTH}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: AUTH_CREDENTIALS()
        }).then((r: any) => { return r.json() } );
    },

    duplicateFinder: async (nameComponent: NameComponents, emailAddress: EmailAddress,  auth_token: any) => {
        const url = 'duplicates/people';
        const params = FormURLParse({
            'request.personName': nameComponent.FullName,
            'request.emailAddress': emailAddress.ItemValue,
            'request.pageSize': 1,
            'request.pageIndex': 0
        })
        return fetch(`${API_URL}/${URL_API}/${url}?${params}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
               ...authHeaders(auth_token),
            }
        }).then((r: any) => { return r.json() } );
    },

    updatePeople: async (peopleId: any, people: People | any,  auth_token: any) => {
        const url = 'people/'+ peopleId;
        return fetch(`${API_URL}/${URL_API}/${url}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
               ...authHeaders(auth_token),
            },
            body: people
        }).then((r: any) => { return r.json() } );
    },

    getPeople: async (peopleId: any, people: People | any,  auth_token: any) => {
        const url = 'people/'+ peopleId;
        return fetch(`${API_URL}/${URL_API}/${url}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
               ...authHeaders(auth_token),
            },
            body: people
        }).then((r: any) => { return r.json() } );
    },

    addPeople: async (people: People | any,  auth_token: any) => {
        const url = 'people';
        return fetch(`${API_URL}/${URL_API}/${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders(auth_token),
            },
            body: people
        }).then((r: any) => { return r.json() } );
    },


    uploadDocument: async ( peopleId: any, file: any, isCSV: boolean,  auth_token: any) => {
        const url = `people/${peopleId}/${isCSV ? 'addcvresume': 'document'}`;
        return fetch(`${API_URL}/${URL_API}/${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
               ...authHeaders(auth_token),
            },
            body: file
        }).then((r: any) => { return r.json() } );
    },

    findDocumentId: async ( peopleId: any, documentName: any,  auth_token: any ) => {
        const url = `people/${peopleId}/documents/list`;
        const filter: any = JSON.stringify({
            "Filter": [
                "AttachmentName",
                "in",
                [
                    documentName
                ]
            ]
        });
        return fetch(`${API_URL}/${URL_API}/${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
               ...authHeaders(auth_token),
            },
            body: filter
        }).then((r: any) => { return r.json() } );
    },

    defultCSVDocument: async ( peopleId: any, documentId: any, auth_token: any) => {
        const url = `people/${peopleId}/documents/${documentId}/defaultCv`;
        return fetch(`${API_URL}/${URL_API}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
               ...authHeaders(auth_token),
            }
        });

    },

    addPeopleCategory: async (peopleId: any, categories: any, auth_token: any) => {
        const url = 'people/'+ peopleId + '/categories';
        return fetch(`${API_URL}/${URL_API}/${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
               ...authHeaders(auth_token),
            },
            body: categories
        }).then((r: any) => { return r.json() } );
    }
 }

export default httpInvenias;