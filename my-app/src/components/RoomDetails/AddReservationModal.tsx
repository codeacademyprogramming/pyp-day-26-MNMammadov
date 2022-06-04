import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { IRoom } from '../../models';
import { addReservation } from '../../redux/rooms/actions';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    room: IRoom;
}

export const AddReservationModal: React.FC<IProps> = ({ isOpen, onClose, room }) => {
    const dispatch = useDispatch();
    const [reservedBy, setReservedBy] = React.useState('');
    const [from, setFrom] = React.useState('2021-06-03T11:30');
    const [to, setTo] = React.useState('2021-06-03T12:30');
    const [notes, setNotes] = React.useState('');

    const handleSubmit = () => {
        if (
            room.reservations.some((reservationsTime) => moment(reservationsTime.from).isAfter(from) && moment(reservationsTime.to).isBefore(to))
            || room.reservations.some((reservationsTime) => moment(from).isAfter(reservationsTime.from) && moment(to).isBefore(reservationsTime.to))
            || room.reservations.some((reservationsTime) => moment(from).isSame(reservationsTime.from) && moment(to).isSame(reservationsTime.to))
        ) {
            alert("this date is busy");
        } else {
            dispatch(addReservation({
                id: uuidv4(),
                reservedBy,
                from,
                to,
                notes,
                roomId: room.id
            }));
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Add new Reservation</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column">
                    <Box mb="24px">
                        <TextField
                            label="Reserved by"
                            variant="outlined"
                            value={reservedBy}
                            onChange={(evt) => setReservedBy(evt.target.value)}
                        />
                    </Box>
                    <Box mb="24px">
                        <TextField
                            label="From"
                            type="datetime-local"
                            variant="outlined"
                            value={from}
                            onChange={(evt) => setFrom(evt.target.value)}
                        />
                    </Box>
                    <Box mb="24px">
                        <TextField
                            label="To"
                            type="datetime-local"
                            variant="outlined"
                            value={to}
                            onChange={(evt) => setTo(evt.target.value)}
                        />
                    </Box>
                    <TextField
                        label="Notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={notes}
                        onChange={(evt) => setNotes(evt.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}