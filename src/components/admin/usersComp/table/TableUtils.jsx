const columns = [
    {name: "שם מלא", uid: "name", sortable: true},
    {name: "סוג משתמש", uid: "role", sortable: true},
    {name: "אימייל", uid: "email" , sortable: false},
    {name: "התחבר לאחרונה", uid: "LastLogin", sortable: true},
    {name: "תאריך הרשמה", uid: "RegisterDate", sortable: true},
    {name: "פעולות", uid: "actions" , sortable: false},
  ];
  
  const roleOptions = [
    {name: "אדמין", uid: "admin"},
    {name: "עורך", uid: "editor"},
    {name: "משתמש רגיל", uid: "user"},
  ];


 const roleTranslater = (role) => {
    switch (role) {
        case "admin":
            return "אדמין";
        case "editor":
            return "עורך";
        case "user":
            return "משתמש רגיל";
    }
}



const dateFormatter = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
}



const connectName = (firstName, lastName) => {
    if (firstName && lastName) {
        return firstName + " " + lastName;
    } else if (firstName) {
        return firstName;
    } else if (lastName) {
        return lastName;
    } else {
        return "";
    }
}




export {columns, roleOptions , roleTranslater , dateFormatter , connectName}