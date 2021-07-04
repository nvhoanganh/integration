SELECT
    type,
    event ->> 'userId' as userId,
    event ->> 'boardId' as boardId,
    event ->> 'pulseName' as taskName,
    event ->> 'columnTitle' as column,
    event -> 'value' -> 'label' ->> 'text' as NewStatus,
    event -> 'previousValue' -> 'label' ->> 'text' as PreviousStatus,
    ts,
    status
  from mondayevents