import { useState } from "react";

export default function useModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => setIsModalVisible(false);
    const openModal = () => setIsModalVisible(true);
    return { isModalVisible, closeModal, openModal };
}
