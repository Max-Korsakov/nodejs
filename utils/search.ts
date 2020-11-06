import { User } from "../models";

type UserProperty = "login";

const filterActiveUsers = (users: User[])=>{
  let data = [...users];
  data = users.filter((user) => !user.isDeleted)
  return data
}

const filterUsersBySubstring = (
  users: User[],
  subString: string,
  property: UserProperty
) => {
  let data = [...users];

  if (subString && property) {
    data = users.filter((user) =>
      new RegExp(subString, "i").test(user[property])
    );
  }

  return data;
};

const sortUsers = (users: User[], sortBy: UserProperty) => {
  const data = [...users];
  data.sort((a, b) => {
    let aField = a[sortBy];
    let bField = b[sortBy];
    if (typeof aField === "string") {
      return aField.localeCompare(bField);
    }

    return 0;
  });

  return data;
};

export { filterUsersBySubstring, sortUsers, filterActiveUsers };
