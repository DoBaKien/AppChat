import LanguageIcon from "@mui/icons-material/Language";
import VideocamIcon from "@mui/icons-material/Videocam";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

import { styled } from "@mui/system";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PetsIcon from "@mui/icons-material/Pets";
import SendIcon from "@mui/icons-material/Send";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MenuIcon from "@mui/icons-material/Menu";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const colorLight = "#008e47";
const colorDark = "#CCFFE6";


export const PhoneI = styled(LocalPhoneIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const FrAdd = styled(PersonAddAlt1Icon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const GrAdd = styled(GroupAddIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const MenuI = styled(MenuIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));

export const HomeI = styled(HomeIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));

export const VideoI = styled(VideocamIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const TransI = styled(LanguageIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const ProfileI = styled(PersonIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));

export const Lout = styled(LogoutIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));

export const ImageI = styled(ImageIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const EmojiI = styled(EmojiEmotionsIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const PetI = styled(PetsIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const SendI = styled(SendIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
export const GifI = styled(GifBoxIcon)(({ theme }) => ({
  color: theme.palette.mode === "light" ? colorLight : colorDark,
}));
