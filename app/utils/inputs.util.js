export const inputs = {
    first_name: {
        placeholder: 'First name',
        type: 'default',
        keyBoardType: 'default'
    },
    last_name: {
        placeholder: 'Last name',
        type: 'default',
        keyBoardType: 'default'
    },
    phone: {
        placeholder: 'Phone number',
        type: 'custom',
        keyBoardType: 'phone-pad',
        mask: '+1 (999) 999-9999',
        maxLength:17,
    },
    email: {
        placeholder: 'Email',
        type: 'email-address',
        keyBoardType: 'email-address',
    },
    search: {
        placeholder: 'Search',
        type: 'default',
        keyBoardType: 'default',
    },
    password: {
        placeholder: 'Password',
        type: 'default',
        keyBoardType: 'default',
    },
    old_password: {
        placeholder: 'Enter existing Password',
        type: 'default',
        keyBoardType: 'default',
    },
    new_password: {
        placeholder: 'Enter new password here',
        type: 'default',
        keyBoardType: 'default',
    },
    confirm: {
        placeholder: 'Confirm password',
        type: 'default',
        keyBoardType: 'default',
    },
    name: {
        placeholder: 'Address name (optional)',
        type: 'default',
        keyBoardType: 'default',
    },
    comment: {
        placeholder: 'Comment (optional)',
        type: 'default',
        keyBoardType: 'default',
    },
    apartment: {
        placeholder: 'Apartment # (optional) ',
        type: 'default',
        keyBoardType: 'default',
    },
    address: {
        placeholder: 'Search address',
        type: 'default',
        keyBoardType: 'default',
    },
    zip: {
        placeholder: 'Zip',
        type: 'custom',
        keyBoardType: 'numeric',
        mask: '99999',
        maxLength:5
    },
    card: {
        placeholder: 'Number of card',
        type: 'credit-card',
        keyBoardType: 'numeric',
        mask: '9999 9999 9999 9999',
        maxLength:19,
        americanExpress: '[0000] [000000] [00000]'
    },
    expires: {
        placeholder: 'Expires',
        type: 'custom',
        keyBoardType: 'numeric',
        mask: '99/99',
        maxLength:5
    },
    code: {
        placeholder: 'CVV',
        type: 'custom',
        keyBoardType: 'numeric',
        mask: '9999',
        maxLength:4
    },
    cvv: {
        placeholder: 'CVV',
        type: 'custom',
        keyBoardType: 'numeric',
        mask: '999',
        maxLength:3
    }
}
