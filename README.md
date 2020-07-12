# fikriramadhan-iissbackendtest


### list API

1. Get All data

    url: ``` http://base_url/tamu```

    method: ```GET```

    response: 
    ```
        {
            "data": [
                {
                    "_id": "5f076af9d0f51143361369ad",
                    "name": "nnnnn",
                    "address": "loremsssssssssssssssssssssssss",
                    "status": true,
                    "phone_number": "1112121",
                    "__v": 0
                },
                {
                    "_id": "5f080642234311181e9a1125",
                    "name": "lorem3",
                    "address": "lorem",
                    "status": true,
                    "phone_number": "11112121",
                    "__v": 0
                }
            ],
            "total": 2,
            "message": "Success"
        }
    ```


2. get One

     url: ``` http://base_url/tamu/{id}```

    method: ```GET```

    response: 
    ```
        {
            "data": {
                "_id": "5f076af9d0f51143361369ad",
                "name": "nnnnn",
                "address": "loremsssssssssssssssssssssssss",
                "status": true,
                "phone_number": "1112121",
                "__v": 0
            },
            "message": "Success"
        }
    ```

3. Add data 

    url: ``` http://base_url/tamu```

    method: ```POST```

    #### case

    - invalid parameter

    parameter body : 
    ```
        {
            "name": "lo",
            "address": "lorem",
            "phoneNumber": 4444,
            "status": false
        }
    ```

    response: 
    ```
        [
            {
                "name": "names must between 3 to 50 character, use uppercase letters, numbers and special characters"
            },
            {
                "phoneNumber": "phoneNumber min 5 max 13 "
            }
        ]
    ```

    - duplicate name 

    parameter body : 
    ```
        {
            "name": "lorem3",
            "address": "lorem",
            "phoneNumber": 11112121,
            "status": false
        }
    ```

    response: 
    ```
        {
            "error": "Name already exsist",
            "message": "Warning"
        }
    ```

    - duplicate Phone Number 

    parameter body : 
    ```
        {
            "name": "lorem4",
            "address": "lorem",
            "phoneNumber": 11112121,
            "status": false
        }
    ```

    response: 
    ```
        {
            "error": "Phone Number already exsist",
            "message": "Warning"
        }
    ```

     - Success 

    parameter body : 
    ```
        {
            "name": "lorem4",
            "address": "lorem",
            "phoneNumber": 1231312312,
            "status": false
        }
    ```

    response: 
    ```
        {
            "data": {
                "_id": "5f0b9559c6805037b8c3a6d1",
                "name": "lorem4",
                "address": "lorem",
                "status": false,
                "phone_number": "1231312312",
                "__v": 0
            },
            "message": "Success"
        }
    ```

4. update data
    url: ``` http://base_url/tamu/{id}```

    method: ```PATCH```

    #### case

    - invalid parameter

    parameter body : 
    ```
        {
            "name": "lo",
            "address": "lorem",
            "phoneNumber": 4444,
            "status": true
        }
    ```

    response: 
    ```
        [
            {
                "name": "names must between 3 to 50 character, use uppercase letters, numbers and special characters"
            },
            {
                "phoneNumber": "phoneNumber min 5 max 13 "
            }
        ]
    ```

    - duplicate name 

    parameter body : 
    ```
        {
            "name": "lorem3",
            "address": "lorem",
            "phoneNumber": 11112121,
            "status": false
        }
    ```

    response: 
    ```
        {
            "error": "Name already exsist",
            "message": "Warning"
        }
    ```

    - duplicate Phone Number 

    parameter body : 
    ```
        {
            "name": "lorem4",
            "address": "lorem",
            "phoneNumber": 11112121,
            "status": false
        }
    ```

    response: 
    ```
        {
            "error": "Phone Number already exsist",
            "message": "Warning"
        }
    ```

     - Success 

    parameter body : 
    ```
        {
            "name": "lorem4",
            "address": "lorem",
            "phoneNumber": 1231312312,
            "status": true
        }
    ```

    response: 
    ```
        {
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            },
            "status": "Data Updated"
        }
    ```

5. Delete data
    url: ``` http://base_url/tamu/{id}```

    method: ```DELETE```

    #### case

    - Guest Confirmed

    response: 
    ```
        {
            "message": "Tamu Seudah Melakukan Verifikasi Kehadiran"
        }  
    ```

    - Success Deleted

    response: 
    ```
        {
            "data": {
                "_id": "5f0b9559c6805037b8c3a6d1",
                "name": "zzzzz",
                "address": "lorem",
                "status": false,
                "phone_number": "1231312312",
                "__v": 0
            },
            "message": "Success"
        }
    ```