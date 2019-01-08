import { Permission } from "@xpfw/validate"

const isServerParams = {user: {_id: Permission.Server}, authenticated: true}

export default isServerParams
