// should handle beautify of data to modal
import { useState } from "react";
import { Button, Text, Modal, View, StyleSheet } from "react-native"
import { addUsertoClass, addAccount, addClass, removeUserfromClass, removeClass, viewAllAccounts, viewAllClasses } from "../admin-functions";
import { OID_toString } from "../../../Util/TO_OBJECTID";
import { to_Time, to_Date } from "../../../Util/TO_DATE";

export const AdminFunk = (props) => {
    const [action, setAction] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState("");
    const [data, setData] = useState([]);

    const shift = (t, d) => {
        setAction(!action);
        setActionType(t);
        setData(d);
        setShowModal(!showModal)
    };

    const unshift = () => {
        setAction(false);
        setActionType("");
        setData();
    };

    const copyUser = (el) => {
        props.setCopiedUser({_id: el._id, _partition: el._partition, userId: el.userId});
    }

    const copyClass = (el) => {
        props.setCopiedClass({classId: el._id})
    }

    const AdminModal = ({children, title}) => (
        <View>
            <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            >
            <View style={styles.container}>
                <Text>{title}</Text>
                {children}
            </View>
            <Button
            title="Close Modal"
            onPress={() => {
                setShowModal(!showModal), unshift();
            }}
            />
            </Modal>
        </View>
    )

    const User = ({el}) => (
        <View>
            <Text>UserName: {el.userId}</Text>
            <Text>ID: {OID_toString(el._id)}</Text>
            <Text>Partition: {el._partition}</Text>
            <Text>Created On : {to_Date(el.createdOn.getTime())} at {to_Time(el.createdOn.getTime())}</Text>
            <Button 
            title={"Select " + el.userId}
            onPress={() => 
                copyUser(el)
            }
            />
        </View>
    );

    const Class = ({el}) => (
        <View>
            <Text>Class: {el.subject}</Text>
            <Text>Code: {el.code}</Text>
            <Text>ID: {OID_toString(el._id)}</Text>
            <Text>Partition: {el._partition}</Text>
            <Text>Created On : {to_Date(el.createdOn.getTime())} at {to_Time(el.createdOn.getTime())}</Text>
            <Button 
            title={"Select " + el.subject + " | " + el.code}
            onPress={() => 
                copyClass(el)
            }
            />
        </View>
    );

    const actionable = () => {
        switch(actionType) {
            // actiontype names are abbreviated by first letter of each function name
            // view all accounts
            case ("vaa"):
                return(
                <AdminModal title={"Copy a User to your Clipboard!"}>
                    {
                        data.map(el => {
                            return <User key={el._id} el={el}></User>
                        })
                    }
                </AdminModal>
                )
            // view all classes
            case ("vac"):
                return(
                <AdminModal title={"Copy a Class to your Clipboard!"}>
                    {
                        data.map(el => {
                            return <Class key={el._id} el={el}></Class>
                        })
                    }
                </AdminModal>
                )
            // add account  
            case ("aa"):
            // add class
            case ("ac"):
            // add user to class
            case ("autc"):
            // remove user from class
            case ("rufc"):
            default: 
                break;
        }
    }
    
    if (action && data) return actionable();
    const type = props.type;
        switch (type) {
            case "account":
                return(
                    <>
                        <Button
                        title="View All Accounts"
                        onPress={async () => await viewAllAccounts(props.authProps).then((e) => {
                            shift("vaa", e);
                        })}
                        />
                        <Button
                        title="Add Account"
                        
                        />
                    </>
                )
            case "class":
                return(
                    <>
                        <Button 
                        title="View All Classes"
                        onPress={async () => await viewAllClasses(props.UserAble).then((e) => {
                            shift("vac", e)
                        })}
                        />
                    </>
                )

            case "banner":
                return(
                    <Button 
                    title="Banner Button"
                    />
                )

            default:
                break;
        };
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      marginTop: 30,
      padding: 30,
    }
});