import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Modal from "styled-react-modal";
import {
  opprettNyPost,
  /*endreKategori, sletteKategori,*/ getKatsByBudsjettID,
} from "../services/budsjettpost";
import { PrimaryButton } from "../App-Styles";

const StyledModal = Modal.styled`
  width: 12rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default function NewPostAction(props) {
  const [tittel, setTittel] = useState("");
  const [sum, setSum] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  async function handleNewPostClick(event) {
    event.preventDefault();
    const kategoriID = props.katid;
    const fast = 0;
    try {
      await opprettNyPost(tittel, sum, fast, kategoriID);
    } catch (error) {}
    props.refreshPage();
    toggleModal();
  }

  return (
    <div>
      <PrimaryButton onClick={toggleModal}>Legg til post</PrimaryButton>

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
          <Input
            placeholder="Sum"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
          />
          {/* <Input placeholder="Tittel" value={tittel} onChange={e => setTittel(e.target.value)} /> */}

          <div>
            <PrimaryButton onClick={handleNewPostClick}>
              Legg til ny budsjettpost
            </PrimaryButton>
          </div>
        </form>
      </StyledModal>
    </div>
  );
}
