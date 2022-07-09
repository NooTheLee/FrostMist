import * as React from "react";
import Avatar from "@mui/material/Avatar";
import {AvatarGroup, Tooltip} from "@mui/material";

export default function GroupAvatars({dataSource, max = 4, user, setOneState}) {
    return (
        <AvatarGroup max={max}>
            {dataSource.map((receivePeople) => (
                <Tooltip
                    title={
                        user && receivePeople._id === user._id
                            ? "You"
                            : receivePeople.name
                    }
                    placement='top'
                    key={receivePeople._id + "grAvatar"}
                    onClick={() => {
                        setOneState("receiveUser", receivePeople);
                    }}>
                    <Avatar
                        alt={receivePeople.name}
                        src={receivePeople.image.url}
                    />
                </Tooltip>
            ))}
        </AvatarGroup>
    );
}
