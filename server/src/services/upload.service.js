export const uploadImage = async image => {
  const logoName = image.name;
  const md5 = image.md5;
  const logoUrl = `public/${md5}_${Date.now()}_${logoName}`;
  const host = `http://localhost:${process.env.PORT}/${logoUrl}`;
  await image.mv(logoUrl, function(err) {
    if (err) {
      throw "Not save image: " + err.message;
    }
  });
  return { logoUrl: host, logoName };
};
