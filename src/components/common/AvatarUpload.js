import React, { createRef, useState } from "react";
import {
  Avatar as MuiAvatar,
  Button as MuiButton,
  makeStyles,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import styled from "styled-components";

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },
}));

const BigAvatar = styled(MuiAvatar)`
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
  border: 1px solid ${grey[500]};
  box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};
`;

const AvatarUpload = ({ avatar = "", setAvatarFile }) => {
  const classes = useStyles();

  const [image, setImage] = useState(avatar);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImageUrl = (newImage) => {
    if (image) {
      cleanup();
    }
    setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];
    setAvatarFile(newImage);
    if (newImage) {
      setImageUrl(URL.createObjectURL(newImage));
    }
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImageUrl(null);
    }
  };

  return (
    <CenteredContent>
      <BigAvatar
        className={classes.large}
        $withBorder
        alt="Avatar"
        src={image}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          variant="outlined"
          color="primary"
          component="span"
          mb={1}
          onClick={handleClick}
        >
          {image ? (
            <>
              <DeleteIcon mr={1} /> Remove
            </>
          ) : (
            <>
              <UploadIcon mr={1} /> Upload
            </>
          )}
        </Button>
      </label>
    </CenteredContent>
  );
};

export default AvatarUpload;
