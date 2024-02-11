interface Resources {
  "common": {
    "inputs": {
      "select": "Select an option"
    },
    "buttons": {
      "save": "Save",
      "prev": "Previous",
      "next": "Next"
    },
    "mode": "Mode",
    "sidebar": {
      "greeting": "Hi! {{user}}",
      "salutation": "Nice to see you!",
      "toastMessage": {
        "success": "You have been successfully logged out.",
        "failure": "Oops. Something went wrong. Please, try again."
      },
      "dashboard": {
        "text": "Dashboard"
      },
      "exercises": {
        "text": "Exercises",
        "links": {
          "grammar": "Grammar",
          "reading": "Reading",
          "vocabulary": "Vocabulary",
          "listening": "Listening"
        }
      },
      "resources": {
        "text": "Resources",
        "links": {
          "articles": "Articles",
          "podcasts": "Podcasts"
        }
      },
      "vocabulary": {
        "text": "Your Vocabulary"
      },
      "tutoring": {
        "text": "Tutoring",
        "links": {
          "tutors": "Find a tutor",
          "online-class": "Order a class"
        }
      },
      "inbox": {
        "text": "Inbox"
      },
      "profile": {
        "text": "Profile"
      },
      "settings": {
        "text": "Settings"
      },
      "logout": {
        "text": "Log out"
      }
    }
  },
  "home": {
    "inputs": {
      "select": "Select an option"
    }
  },
  "profile": {
    "headers": {
      "personalInfoHeader": "Personal Information",
      "motivationHeader": "Your Motivation",
      "interestsHeader": "Your Interests"
    },
    "subheadings": {
      "personalInfoSubheading": "Let's keep in touch",
      "motivationSubheading": "What motivates you to learn English?",
      "interestsSubheading": "What are you interested in?"
    },
    "proverb": {
      "content": "As many languages you know, as many times you are a human being.",
      "author": "Johann Wolfgang von Goethe"
    },
    "personalInfo": {
      "firstName": "First name",
      "lastName": "Last name",
      "email": "Your E-mail",
      "birthday": "Your Birthday",
      "toastMessage": {
        "success": "Yor profile has been successfully updated.",
        "failure": "Oops. Something went wrong. Try again.."
      }
    },
    "motivation": {
      "family": "Family",
      "toastMessage": {
        "success": "Yor profile has been successfully updated.",
        "failure": "Oops. Something went wrong. Try again.."
      }
    },
    "interests": {
      "Music": "Music",
      "toastMessage": {
        "success": "Yor profile has been successfully updated.",
        "failure": "Oops. Something went wrong. Try again.."
      }
    },
    "profileAvatar": {
      "heading": "Upload your photo",
      "buttons": {
        "goBack": "Go back",
        "tryAgain": "Try again"
      },
      "instructions": {
        "instruction_dragAndDrop": "Drag and drop your image here",
        "instruction_choose": "choose a profile picture",
        "instruction_size": "Max size is 5 MB"
      },
      "validation": {
        "validationMessage_size": "File size exceeds the maximum allowed size (5 MB).",
        "validationMessage_server": "No Server Response.",
        "validationMessage_default": "Image upload failed. Please, try again.",
        "validationMessage_format": "Invalid file format. Please upload a valid image."
      }
    }
  },
  "settings": {
    "header": {
      "mainHeader": "Settings"
    },
    "subheadings": {
      "changePassword": "Change Password",
      "defaultLanguage": "Choose default language",
      "changeTheme": "Change Theme",
      "deleteAccount": "Delete Account"
    },
    "languages": {
      "en": "English(default)",
      "ua": "Ukrainian",
      "pl": "Polish"
    },
    "selectLanguage": {
      "selectInputText": "Choose the language",
      "toastMessage": "A default language has been changed."
    },
    "changePassword": {
      "prevPassword": "Previous password",
      "newPassword": "New password",
      "confirmPassword": "Confirm password"
    },
    "validation": {
      "validationMessage_one": "must be different than your previous password.",
      "validationMessage_two": "8 to 24 characters.<1/>Must include uppercase and lowercase letters, a number and a special character.<1/> Allowed special characters: ",
      "validationMessage_three": "Must match the first password input field."
    }
  }
}

export default Resources;
