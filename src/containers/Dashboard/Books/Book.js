import React, { useState, useEffect } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  ContainerInline,
  FlexRow,
  Button,
} from "../../../components/CommonComponents";
import Spinner from "../../../components/Spinner";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import LendDialog from "./LendDialog";
import AddEditBookDialog from "./AddEditBookDialog";

import {
  getBook,
  lendBook,
  returnBook,
  deleteBook,
  editBook,
} from "../../../api/bookAPI";
import { getTodaysDate } from "../../../shared/utils";

import {
  updateBook,
  deleteBook as deleteBookStore,
} from "../../../store/booksSlice";

import BookCoverPlaceholder from "../../../shared/book-cover-placeholder.png";

const ContainerInlineTextAlignLeft = styled(ContainerInline)`
  align-items: flex-start;
`;

const H1 = styled.h1`
  text-align: left;
`;

const H2 = styled.h2`
  text-align: left;
`;

const Books = ({ id, handleBackClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showLendConfirmation, setShowLendConfirmation] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);
  const [showEditBookDialog, setShowEditBookDialog] = useState(false);

  const books = useSelector((state) => state.books.value);
  const Books = books.find((element) => element.id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getBook(id)
      .then((response) => {
        if (!response.error) {
          setBook(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = (confirmation) => {
    if (confirmation) {
      setIsLoading(true);
      deleteBook(book.id)
        .then((response) => {
          if (!response.error) {
            dispatch(deleteBookStore(response.data));
            handleBackClick();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowDeleteConfirmation(false);
  };

  const handleLend = (confirmed, memberId) => {
    if (confirmed) {
      setIsLoading(true);
      lendBook(book.id, memberId, getTodaysDate())
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

  const handleEdit = (confirmed, data) => {
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
                  The epic that made Mitchell’s name is a Russian doll of a
                  book, nesting stories within stories and spanning centuries
                  and genres with aplomb. From a 19th-century seafarer to a tale
                  from beyond the end of civilisation, via 1970s nuclear
                  intrigue and the testimony of a future clone, these dizzying
                  narratives are delicately interlinked, highlighting the echoes
                  and recurrences of the vast human symphony.
                </p>
                {book.isAvailable ? (
                  ""
                ) : (
                  <>
                    <h4>{`Burrowed by: ${book.burrowedMemberId}`}</h4>
                    <h4>{`Burrowed date: ${book.burrowedDate}`}</h4>
                  </>
                )}
              </ContainerInlineTextAlignLeft>
              <ContainerInline>
                <img
                  src={BookCoverPlaceholder}
                  alt="Book Cover Placeholder"
                  style={{ border: "1px solid black" }}
                />
              </ContainerInline>
            </FlexRow>
            <FlexRow>
              {book.isAvailable ? (
                <>
                  <Button onClick={() => setShowLendConfirmation(true)}>
                    Lend
                  </Button>
                  <Button onClick={() => setShowEditBookDialog(true)}>
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => setShowDeleteConfirmation(true)}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button onClick={() => setShowReturnConfirmation(true)}>
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
        show={showEditBookDialog}
        handleClose={handleEdit}
        data={Books}
      />
    </>
  );
};

export default Books;
