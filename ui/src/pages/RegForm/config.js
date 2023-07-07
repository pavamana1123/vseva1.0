import moment from 'moment'
import _ from "../../_"

var config = {
  feilds: [
    {
      label: "Basic Details",
      type: "section"
    },
    {
      label: "Enter your full-name",
      type: "text",
      processor: (v) => {
        return (v || '').toNameCase();
      },
      id: 'name',      
      mandatory: true
    },
    {
      label: "Enter your 10-digit mobile number (preferably WhatsApp number)",
      type: "tel",
      processor: (v) => {
        return (v || '').toPhoneCase();
      },
      id: 'phone',      
      invalidator: (v) => {
        if (!_.phoneRegex.test(v)) {
          return 'Invalid phone number!';
        }
      },
      mandatory: true
    },
    {
      label: "Enter E-mail ID",
      type: "email",
      id: 'email',      
      invalidator: (v) => {
        if (!_.emailRegex.test(v)) {
          return 'Invalid E-mail!';
        }
      }
    },
    {
      label: "Date of Birth",
      type: "date",
      id: 'dob',      
      invalidator: (v) => {
        const minAge = moment().subtract(90, "years");
        const maxAge = moment().subtract(5, "years");
  
        if (!moment(v, "YYYY-MM-DD", true).isValid()) {
          return "Invalid date";
        }
  
        if (moment(v).isBefore(minAge) || moment(v).isAfter(maxAge)) {
          return "Date of birth outside acceptable range";
        }
      },
      mandatory: true
    },
    {
      label: "Gender",
      type: "radio",
      options: ['Male', 'Female'],
      id: 'gender',      
      mandatory: true
    },
    {
      label: "How many rounds of Hare Krishna mantra do you chant daily?",
      type: "number",
      id: 'japaRounds',      
      invalidator: (v) => {
        v = v || -1;
        return v < 0 || v > 64 ? 'Must be between 0 and 64' : null;
      },
      mandatory: true
    },
    {
      label: "Which one of the following devotees are you in touch with?",
      type: "radio",
      options: _.preacherList.sort().concat(["None"]),
      id: 'preacher',      
      mandatory: true
    },
    {
      label: "Availability",
      type: "section"
    },
    {
      label: "",
      type: "section"
    },
    {
      label: "Are you registering for yourself or other?",
      type: "radio",
      options: ["Myself", "Others"],
      id: 'self',      
      mandatory: true
    }
]}

export default config