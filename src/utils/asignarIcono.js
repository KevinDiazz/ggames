import { items } from "./variables";
export default function getIcons(nameIcon) {
  let Url = null;
  items.map((val) => {
    if (nameIcon == val.title) {
      Url = val.url;
    }
  });
  return Url;
}
