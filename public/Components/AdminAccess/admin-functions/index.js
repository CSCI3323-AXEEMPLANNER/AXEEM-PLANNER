// !! View !!
export async function viewAllAccounts(authProps) {
    // get latest information from db
    // and set in authprops provider (function in AuthProvider)
    const res = await authProps.updateCollection();
    if (res) {
        // return array
        const arr = await authProps.ADMIN_COLLECTION;
        if (arr.length > 0) return arr;
        return "No Accounts :(";
    }
    return "Unsuccessul Update from DB";
};

export async function viewAllClasses(UserAble) {
    // gets classes from realms partitionz
    const arr = await UserAble.viewAllClasses();
    // return array
    if (arr.length > 0) return arr;
    return "No Classes :("
};

// props -> properties, accepts some object with values

// !! Add Account !!
export async function addAccount(authProps, props) {
    // props: user obj
    // props should be strings, so trim to remove any accidental spacing
    const userId = props.email.trim();
    const pass = props.password.trim();
    const role = props.role.trim();
    // checks to see if successful signup
    const res = await authProps.signUp(userId, pass, role);
    return res;
};

// !! Add Class !!
export async function addClass(UserAble, props) {
    // props: class obj
    // props should be a string, trim to remove blank space
    const title = props.title.trim();
    const subject = props.subject.trim();
    const desc = props.desc.trim();
    const endTime = props.endTime;
    const startTime = props.startTime;
    const code = props.code.trim();
    // createClass accepts an object
    const res = await UserAble.createClass({title: title, subject: subject, desc: desc, endTime: endTime, startTime: startTime, code: code});
    if (res) return true;
    return false;
};

// !! Add any user type to class !!
export async function addUsertoClass(UserAble, props) {
    // props: class, user objs, actions: add/delete
    const userId = props.user.trim();
    const userPartition = props.partition.trim();
    const classId = props.class.trim();
    const action = "add";
    const res = await UserAble.mutateUserToClass(userId, classId, userPartition, action);
    if (res) return true;
    return false;
};

export async function removeUserfromClass(UserAble, props) {
    // props: class, user objs, actions: add/delete
    const userId = props.user.trim();
    const userPartition = props.partition.trim();
    const classId = props.class.trim();
    const action = "remove";
    const res = await UserAble.mutateUserToClass(userId, classId, userPartition, action);
    if (res) return true;
    return false;
};

export async function removeClass(UserAble, props) {
    // props: class obj
    const classId = props.class.trim();
    const res = await UserAble.removeClass(classId);
    if (res) return true;
    return false;
};

// !! Update Banner !!
export function updateBanner(props) {
    // props: string
    // can be empty
    const msg = props.string.trim();
    // complete banner set
};