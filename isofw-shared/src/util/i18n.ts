import { get } from "lodash"
import { vsprintf } from "sprintf-js"

const translations = {
  home: "Home",
  name: "Name",
  page: "Page",
  ip: "IP-Address",
  create: "Create",
  actions: "Actions",
  save: "Save",
  error: "Error",
  success: "Success",
  inputError: "Your Input is faulty and cannot be submitted. This is a list of the problems: %s",
  created: "Successfully created entry with ID %s",
  saved: "Successfully saved entry with ID %s",
  remove: "Remove",
  email: "E-Mail / Username",
  password: "Password",
  project: {
    direct: "Direct",
    program: "Adjust Script",
    operate: "Operate",
    edit: "Edit Project"
  },
  director: {
    title: "Director",
    project: "Current Project: ",
    next: "Next",
    previous: "Prev",
    cameras: "Automatically controlled cameras"
  },
  login: {
    btnLogin: "Login",
    btnLogout: "Logout",
    register: "Register",
    ask: "Please log in",
    required: "You need to be logged in to view this.",
    navigate: "Already logged in. Do you want to navigate somewhere?",
    logout: "Or do you wish to log out?"
  },
  benchmark: {
    header: "Benchmark",
    progress: "Executed %i out of %i Actions",
    start: "Begin Benchmark",
    onlyDiff: "Patch only Diffs: %t",
    parallel: "Execute in parallel: %t"
  },
  demoData: {
    header: "Manage Demo Data",
    progress: "Created %i of %i data entries"
  },
  operator: {
    project: "Active Project",
    currentShot: "Current Shot",
    cameras: {
      showAll: "Showing all cameras",
      noOne: "No one",
      all: "All",
      allCameras: "All Cameras",
      list: "Cameras: ",
      singularCamera: "Camera: "
    },
    table: {
      shot: "Shot",
      camera: "CA",
      preset: "Preset",
      importance: "!",
      name: "Name",
      type: "Type",
      movement: "Movement",
      towards: "Towards",
      duration: "Duration",
      picture: "Preview",
      remarks: "Remarks"
    },
    btns: {
      ready: "Shot Ready",
      update: "Update Preset",
      wide: "Wide",
      stopZoom: "Stop Zoom",
      tele: "Tele",
      notReady: "Not ready",
      autoScroll: "AutoScroll",
      presetView: "View Presets",
      scriptView: "View Script",
      disableAutoScroll: "Don't scroll",
      enableAutoScroll: "Auto scroll"
    }
  },
  // Form Related Entries
  shot: "Currently Active Shot",
  cameras: "Assign Cameras",
  operators: "Assign Camera Operators",
  operatorToCamera: "Assign Cameras to Operators",
  pname: "Shot Name",
  type: "Shot Type",
  movement: "Movement",
  duration: "Duration",
  directorRemarks: "Remarks by Director",
  operatorRemarks: "Remarks by Operator",
  importance: "Importance of the Shot",
  forScrollSpeed: "Content hidden while scrolling for performance reasons"
}

const i18n: {
  language: string
  data: any,
  addTranslations: (lanugage: string, data: Object) => void,
  t: (key: string, ...args: any[]) => string
} = {
  language: "en",
  data: {
    en: translations
  },
  addTranslations: (language, data) => {
    Object.assign(i18n.data[language], data)
  },
  t: (key, args) => {
    const v = get(i18n.data[i18n.language], key, key)
    return args != null && args.length > 0 ? vsprintf(v, args) : v
  }
}

export default i18n
