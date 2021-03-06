import React, { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Button, Container, ContainerInline, FlexRow, } from "../../components/ConnonComponents";
import Spinner from "../../../components/Spinner";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import LendDialog from "./LendDialog";
import AddEditBookDialog from "./AddEditBookDialog";

import { lendBook, returnBook, deleteBook, editBook } from "../../../api/bookAPI";
import BookCoverPlaceholder from "../../shared/book-cover-placeholder.png";
import { getTodaysDate } from "../../../shared/utils";
import { updateBook, deleteBook as deleteBookStore} from "../../../store/bookSlice";

const ContainerInlineTextAlignLeft = styled(ContainerInline)`
    align-item: flex-start;
`;

const H1 = styled.h1`
    text-align: left;
`;

const H2 = styled.h2`
    text-align: left;
`;

const Book = ({ id, handleBackClick }) => {
  const [isLoading, setIsLoading] = useState(false); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showLendConfirmation, setShowLendConfirmation] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);
  const [showEditBookDialog, setShowEditBookDialog] = useState(false);

  const books = useSelector((state) => state.books.value);
  const book = books.find((element) => element.id === id);

  const dispatch = useDispatch();
 
  const handleDelete = (confirmation) => {
    if(confirmation){
      setIsLoading(true);
      deleteBook(book.id ) 
      .then((response) => { 
        if (!response.error) { 
          dispatch(deleteBookStore(response.data));
          handleBackClick();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
    setShowDeleteConfirmation(false);
   
  };

  const handleLend = (confirmed, memberId) => {
    if (confirmation) {
      setIsLoading(true);
      lendBook(book.id, memberId, getTodaysDate()).then((response) => {
        if (!response.error) { 
          dispatch(updateBook(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      }) 
    setShowLendConfirmation(false);
  };

  const handleReturn = (confirmed) => {
    if (confirmed) {
       setIsLoading(true);
      returnBook(book.id)
        .then((response) => {
          if (!response.error) { 
            dispatch(updateBook(response.data));
          }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
    setShowReturnConfirmation(false);
  };

  const handleReturn = (confirmed, data) => {
    if (confirmed) {
       setIsLoading(true);
      editBook(book.id, data)
        .then((response) => {
          if (!response.error) { 
            dispatch(updateBook(response.data));
          }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
    setShowEditBookDialog(false);
  };


  return (
    <>
    <Container>
      <Button onClick={handleBackClick} size={1.5}>
        <IoReturnUpBack />
      </Button>
      {!isLoading && book !== null ? (
        <>
        <FlexRow>
          <ContainerInlineTextAlignLeft>
            <H1>{book.title}</H1>
            <H2>{`by ${book.author}`}</H2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            {book.isAvailable ? (
              ""
            ) : (
              <>
                <h4>{`Borrowed by: ${book.burrowedMemberId}`}</h4>
                <h4>{`Borrowed date: ${book.burrowedDate}`}</h4>
              </>
            )}
          </ContainerInlineTextAlignLeft>
          <ContainerInline>
              <img
                src={BookCoverPlaceholder}
                alt="Book Cover Placeholder"
                style={{border: "1px solid black"}}
              />  
          </ContainerInline>
        </FlexRow>
        <FlexRow>
        {book.isAvailable ? ( 
            <>
                <Button
                    onClick={()=> 
                      setShowLendConfirmation(true)
                    }
                >
                    Lend
                </Button>
                <Button
                    color="danger"
                    onClick={() =>
                      setShowEditConfirmation(true)
                    }
                >
                    Edit
                </Button>
                <Button
                    color="danger"
                    onClick={() =>
                      setShowDeleteConfirmation(true)
                    }
                >
                    Delete 
                </Button>
            </>  
        ) : (
            
                <Button
                    onClick={() => 
                      setShowReturnConfirmation(true)
                    }
                >
                    Return
                </Button>
            
        )}
        </FlexRow>
        </>
      ) : (
        <Spinner />
      )}
    </Container>
    <ConfirmationDialog
      handleClose={handleDelete}
      show={showDeleteConfirmation}
      headerText="Confirm book deletion"
      detailText="Are You Sure You Want To Delete This Book? This Action Can't be Undone."
    />
    <LendDialog show={showLendConfirmation} handleClose={handleLend} />
    
    <ConfirmationDialog
      handleClose={handleReturn}
      show={showReturnConfirmation}
      headerText="Confirm book Return"
      detailText="Press Yes to Confirm return book."
    />
    <AddEditBookDialog
      isEdit={true}
      show={showEditConfirmation}
      handleClose={handleEdit}
      data={book}
    />
    </>
    );
  };
}
export default Book;
  