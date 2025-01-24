import {forwardRef} from "react";

const HiddenFileInput = forwardRef(({ onChange, accept = "image/*" }, ref) => {
    return (
        <input
            type="file"
            ref={ref}
            onChange={onChange}
            accept={accept}
            style={{ display: "none" }}
        />
    );
});

export default HiddenFileInput;