import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Modal from "styled-react-modal";
import { opprettNyKategori, getKatsByBudsjettID } from "../services/kategori";
import { PrimaryButton } from "../App-Styles";

const StyledModal = Modal.styled`
  width: 12rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default function NewKatAction(props) {
  const [tittel, setTittel] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  async function handleNewKatClick(event) {
    event.preventDefault();

    try {
      await opprettNyKategori(tittel, props.budID);
    } catch (error) {}
    // const newKat = { ID: 5, budsjettID: props.budID, tittel: tittel };
    props.refreshPage();
    toggleModal();
  }

  return (
    <div>
      <PrimaryButton onClick={toggleModal}>Legg til kategori</PrimaryButton>

      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <form>
          <Input
            placeholder="Tittel"
            value={tittel}
            onChange={(e) => setTittel(e.target.value)}
          />

          <div>
            <PrimaryButton onClick={handleNewKatClick}>
              Legg til ny kategori
            </PrimaryButton>
          </div>
        </form>
      </StyledModal>
    </div>
  );
}
