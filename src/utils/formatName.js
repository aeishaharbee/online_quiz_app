export const formatGroupName = (groupName) => {
  return groupName.replace(/([A-Z])/g, " $1").trim();
};
