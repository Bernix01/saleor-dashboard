import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import useModalDialogErrors from "@saleor/hooks/useModalDialogErrors";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { UserError } from "@saleor/types";
import { AttributeDetails_attribute_values } from "../../types/AttributeDetails";

export interface AttributeValueEditDialogFormData {
  name: string;
}
export interface AttributeValueEditDialogProps {
  attributeValue: AttributeDetails_attribute_values | null;
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: UserError[];
  open: boolean;
  onSubmit: (data: AttributeValueEditDialogFormData) => void;
  onClose: () => void;
}

const AttributeValueEditDialog: React.StatelessComponent<
  AttributeValueEditDialogProps
> = ({
  attributeValue,
  confirmButtonState,
  disabled,
  errors: apiErrors,
  onClose,
  onSubmit,
  open
}) => {
  const intl = useIntl();
  const initialForm: AttributeValueEditDialogFormData = {
    name: maybe(() => attributeValue.name, "")
  };
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {attributeValue === null ? (
          <FormattedMessage
            defaultMessage="Add Value"
            description="add attribute value"
            id="attributeValueEditDialogTitleNewValue"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Edit Value"
            description="edit attribute value"
            id="attributeValueEditDialogTitle"
          />
        )}
      </DialogTitle>
      <Form errors={errors} initial={initialForm} onSubmit={onSubmit}>
        {({ change, data, errors: formErrors, submit }) => (
          <>
            <DialogContent>
              <TextField
                autoFocus
                disabled={disabled}
                error={!!formErrors.name}
                fullWidth
                helperText={formErrors.name}
                name={"name" as keyof AttributeValueEditDialogFormData}
                label={intl.formatMessage({
                  defaultMessage: "Name",
                  description: "attribute name",
                  id: "attributeValueEditDialogNameField"
                })}
                value={data.name}
                onChange={change}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...commonMessages.cancel} />
              </Button>
              <ConfirmButton
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                onClick={submit}
              >
                <FormattedMessage {...commonMessages.save} />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
AttributeValueEditDialog.displayName = "AttributeValueEditDialog";
export default AttributeValueEditDialog;