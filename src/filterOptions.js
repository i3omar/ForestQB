export const optionsData = {
    "init": [
        {
            "text": "Contain",
            "id": "select1",
            "title": "The entity should contain this text.",
            "datatype": [
                "string",
                "literal",
                "object"
            ]
        },
        {
            "text": "Bound",
            "id": "select4",
            "data-value": "bound",
            "title": "Check if it is bound to a value.",
            "datatype": [
                "string",
                "literal",
                "float",
                "double",
                "decimal",
                "integer",
                "date",
                "time",
                "datetime",
                "object"
            ]
        },
        {
            "text": "Match",
            "id": "select1",
            "data-value": "match",
            "title": "The entity should exactly match this text.",
            "datatype": [
                "string",
                "literal",
                "float",
                "double",
                "decimal",
                "integer"
            ]
        },
        {
            "text": "Regex",
            "id": "select1",
            "data-value": "regex",
            "title": "Match text against a regular expression pattern.",
            "datatype": [
                "string",
                "literal"
            ]
        },
        {
            "text": "Range",
            "id": "select3",
            "data-value": "range",
            "title": "Restrict the query based on an arithmetic expression.",
            "datatype": [
                "float",
                "double",
                "decimal",
                "integer"
            ]
        },
        {
            "text": "Range",
            "id": "select5",
            "data-value": "range",
            "title": "Restrict the query based on an specific date.",
            "datatype": [
                "date"
            ]
        },
        {
            "text": "Range",
            "id": "select6",
            "data-value": "range",
            "title": "Restrict the query based on an specific time.",
            "datatype": [
                "time"
            ]
        },
        {
            "text": "Range",
            "id": "select7",
            "data-value": "range",
            "title": "Restrict the query based on an specific date and time.",
            "datatype": [
                "datetime"
            ]
        },
        {
            "text": "Aggregate Functions",
            "id": "select8",
            "data-value": "Function",
            "title": "To perform calculations on values of a specific property.",
            "datatype": [
                // "string",
                // "literal",
                "float",
                "double",
                "decimal",
                "integer",
                // "date",
                // "time",
                // "datetime",
                // "object"
            ]
        },
        {
            "text": "Date & Time Functions",
            "id": "select9",
            "data-value": "Function",
            "title": "To extract and manipulate date and time components.",
            "datatype": [
                "date",
                "time",
                "datetime"
            ]
        },
        {
            "text": "Aggregate Functions",
            "id": "select10",
            "data-value": "Function",
            "title": "To perform calculations on values of a specific property.",
            "datatype": [
                "string",
                "literal",
                "date",
                "time",
                "datetime",
                "object"
            ]
        },
    ],
    "select0": {
        "type": "none"
    },
    "select1": {
        "type": "text"
    },
    "select2": {
        "type": "select",
        "options": [
            {
                "text": "Contain",
                "id": "select1"
            },
            {
                "text": "Find",
                "id": "select2"
            },
            {
                "text": "match",
                "id": "select3"
            }
        ]
    },
    "select3": {
        "type": "number"
    },
    "select4": {
        "type": "select",
        "options": [
            {
                "text": "Must Exist",
                "id": "exist",
                "selected": ""
            },
            {
                "text": "Not Exist",
                "id": "not"
            }
        ]
    },
    "select5": {
        "type": "dateRange"
    },
    "select6": {
        "type": "timeRange"
    },
    "select7": {
        "type": "dateTimeRange"
    },
    "select8": {
        "type": "select",
        "options": [
            {
                "text": "Average - calculates the mean value.",
                "id": "AVG",
                "selected": ""
            },
            {
                "text": "Maximum - finds the highest value.",
                "id": "MAX",
            },
            {
                "text": "Minimum - finds the lowest value.",
                "id": "MIN",
            },
            {
                "text": "Sum - totals all values.",
                "id": "SUM",
            },
            {
                "text": "Count - counts the number of values.",
                "id": "COUNT",
            },
            {
                "text": "Sample - returns a random sample value.",
                "id": "SAMPLE",
            },
            {
                "text": "GroupConcat - concatenates values into a single string.",
                "id": "GROUP_CONCAT",
            }
        ]
    },
    "select9": {
        "type": "select",
        "options": [
            {
                "text": "DATE - date part of dateTime.",
                "id": "DATE"
            },
            {
                "text": "YEAR - extracts the year.",
                "id": "YEAR"
            },
            {
                "text": "MONTH - extracts the month.",
                "id": "MONTH"
            },
            {
                "text": "DAY - extracts the day.",
                "id": "DAY"
            },
            {
                "text": "HOURS - extracts the hour.",
                "id": "HOURS"
            },
            {
                "text": "MINUTES - extracts minutes.",
                "id": "MINUTES"
            },
            {
                "text": "SECONDS - extracts seconds.",
                "id": "SECONDS"
            },
            // {
            //     "text": "TIMEZONE - timezone of dateTime.",
            //     "id": "TIMEZONE"
            // },
            // {
            //     "text": "TZ - timezone as a string.",
            //     "id": "TZ"
            // },
            
        ]
    },
    "select10": {
        "type": "select",
        "options": [
            {
                "text": "Count - counts the number of values.",
                "id": "COUNT",
            },
            {
                "text": "Sample - returns a random sample value.",
                "id": "SAMPLE",
            },
            {
                "text": "GroupConcat - concatenates values into a single string.",
                "id": "GROUP_CONCAT",
            }
        ]
    },
}