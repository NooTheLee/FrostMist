// common component
import Modal from "./common/Modal";
import Nav from "./common/Nav";
import Post from "./common/Post";
import Comment from "./common/Comment";
import Dropdown from "./common/Dropdown";
import FormCreatePost from "./common/FormCreatePost";
import ItemsList from "./common/ItemsList";
import GroupAvatars from "./common/GroupAvatars";
import ModalQrCode from "./common/ModalQrCode";
import Table from "./common/table/Table";
import LineChart from "./common/chart/LineChart";

// loading component
import LoadingPost from "./loading/Loading.Post";
import LoadingWeather from "./loading/Loading.Weather";
import LoadingSuggestion from "./loading/Loading.Suggestion";
import LoadingForm from "./loading/Loading.Form";
import LoadingProfile from "./loading/Loading.Profile";
import LoadingIntro from "./loading/Loading.Intro";
import LoadingImage from "./loading/Loading.Image";
import LoadingCard from "./loading/Loading.Card";
import LoadingPostInformation from "./loading/Loading.PostInformation";
import LoadingMessenger from "./loading/Loading.Messenger";

// pages
import Messenger from "./messenger/messenger.pages";
import Dashboard from "./dashboard/DashBoard.pages";
import Profile from "./profile/Profile.pages";
import Admin from "./admin/Admin.page";
import Information from "./post/Information.pages";

// function
import colorGeneration from "./common/colorGeneration";

export {
    // common
    Nav,
    Post,
    Modal,
    Comment,
    Dropdown,
    ItemsList,
    GroupAvatars,
    FormCreatePost,
    ModalQrCode,
    Table,
    LineChart,
    //loading
    LoadingPost,
    LoadingWeather,
    LoadingSuggestion,
    LoadingForm,
    LoadingProfile,
    LoadingIntro,
    LoadingImage,
    LoadingPostInformation,
    LoadingCard,
    LoadingMessenger,
    // page
    Messenger,
    Dashboard,
    Profile,
    colorGeneration,
    Admin,
    Information,
};
