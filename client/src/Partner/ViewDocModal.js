import React from 'react';
import { Modal } from 'antd';

export const ImageViewModal = ({ visible, imageSrc, onCancel }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true} // Add this line to reset the modal on close

    >
      <img src={imageSrc} alt="Adhar Card" style={{ maxWidth: '100%', height: 'auto' }} />
    </Modal>
  );
};

