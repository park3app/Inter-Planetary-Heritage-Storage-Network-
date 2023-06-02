import React, { useEffect } from 'react';
import { useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';

const Popup = ({ message }) => {
  const toast = useToast();
  const onClose = () => {};

  useEffect(() => {
    const toastId = toast({
      title: message,
      status: 'info',
      duration: 2000, // Display duration in milliseconds
      isClosable: true,
    });

    return () => {
      toast.close(toastId);
    };
  }, [toast, message]);

  return null;
};

export default Popup