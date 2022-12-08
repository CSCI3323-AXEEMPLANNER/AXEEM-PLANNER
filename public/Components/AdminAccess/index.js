import React, { useState } from "react";
import { Button, FlatList, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Modal } from "react-native";
// importing functions
import { AdminFunk } from "./admin-able";
import { addUsertoClass, addAccount, addClass, removeUserfromClass, removeClass, viewAllAccounts, viewAllClasses } from "./admin-functions";

export const AdminAccess = (props) => {
        // state vars to show functions for admin on press
        const [currView, setCurrView] = useState("");
        const [openView, setOpenView] = useState(false);
        const [viewArray, setViewArray] = useState([
            { label: "View Account Action(s)", value: "account" },
            { label: "View Class Action(s)", value: "class" },
            { label: "View Banner Action(s)", value: "banner" },
        ]);
        const [copiedUser, setCopiedUser] = useState({});
        const [copiedClass, setCopiedClass] = useState({});

        const authProps = props.authProps;
        const UserAble = props.UserAble;
        return (
        <>
            <DropDownPicker
              open={openView}
              value={currView}
              items={viewArray}
              setOpen={setOpenView}
              setValue={setCurrView}
              setItems={setViewArray}
              placeholder="Select Action"
              activityIndicatorColor="#5188E3"
              onChangeValue={(value) => {
                setCurrView(value)
              }}
              zIndex={1000}
              zIndexInverse={3000}
            />
            {
              currView ?
              <>
                <Text>Viewing {currView} Actions</Text>
                {/* WRAP FUNCTIONS FOR EACH OF THE CLASSES, ACCOUNTS, AND BANNER ACTIONS INTO AN ARRAY */}
                <AdminFunk type={currView} authProps={authProps} UserAble={UserAble} setCopiedUser={setCopiedUser} setCopiedClass={setCopiedClass} />
              </>
              : <Text>Please Select an Action Above</Text>
            }
            {
              copiedUser ? <Text style={{ fontSize: 15 }}>Selected User: {"\n" + JSON.stringify(copiedUser)}</Text> : "Select a User!"
            }
            {
              copiedClass ? <Text style={{ fontSize: 15 }}>Selected Class: {"\n" + JSON.stringify(copiedClass)}</Text> : "Select a Class!"
            }
        </>
    )
}