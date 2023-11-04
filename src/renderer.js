async function handlepasteimage() {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type);
        const objectURL = URL.createObjectURL(blob);

        document.querySelector("#image").setAttribute("src", objectURL);
      }
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
