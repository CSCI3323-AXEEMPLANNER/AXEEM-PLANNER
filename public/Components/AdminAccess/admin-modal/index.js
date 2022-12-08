import { OID_toString } from "../../../Util/TO_OBJECTID";
import { to_Time, to_Date } from "../../../Util/TO_DATE";
import { Button, Text, Modal, View } from "react-native"

export const UserModal = (el, unshift) => {
    return (
        <View>
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showModal}
                >
                <View>
                    <Text>Copy a User to your Clipboard!</Text>
                    {(data.map(el => {
                        return (
                        <View>
                            <Text>UserName: {el.userId}</Text>
                            <Text>ID: {OID_toString(el._id)}</Text>
                            <Text>Partition: {el._partition}</Text>
                            <Text>Created On : {to_Date(el.createdOn.getTime())} at {to_Time(el.createdOn.getTime())}</Text>
                        </View>
                        )
                    }))}
                    <Button
                    title="Click To Close Modal"
                    onPress={() => {
                        setShowModal(!showModal), unshift();
                    }}
                />
                </View>
            </Modal>
        </View>
    )
}