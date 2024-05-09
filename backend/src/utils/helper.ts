import fs from "fs";

export const removeLocalFile = (localFilePath: string) => {
    if (!localFilePath) return;

    fs.unlink(localFilePath, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Unused local file removed");
        }
    });
};
