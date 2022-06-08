
const existingItem = (array, relatedId, attributeFn = null) => {
  // console.log({ array }, { relatedId })
  if (!attributeFn) {
    attributeFn = (item) => item.id;
  }
    return array.filter(item => attributeFn(item) === relatedId)[0]
}

function structureTransactions(users, bookings, reviews, item) {
  const customer = existingItem(users, item.attributes.customerId);
  const provider = existingItem(users, item.attributes.providerId);
  const attributeFn = (item) => item.attributes.transactionId;

  const listing = existingItem(provider?.listings || [], item.attributes.listingId);
  const booking = existingItem(bookings, item.id, attributeFn);
  const relevantReviews = reviews.filter(r => r.attributes.transactionId === item.id);
  console.log({ relevantReviews })
  const customerReview = relevantReviews.filter(r => r.attributes.type === 'ofCustomer')[0];
  const providerReview = relevantReviews.filter(r => r.attributes.type === 'ofProvider')[0];

  const enhancedItem = {
    providerName: !provider ? 'Deleted user' : `${provider?.firstName} ${provider?.lastName}`,
    customerName: !customer ? 'Deleted user' : `${customer?.firstName} ${customer?.lastName}`,
    listingName: !listing ? 'Deleted listing' : listing.attributes.title,
    ...item,
    ...item.attributes,
    ...item.attributes.lineItems,
    payInTotal: item.attributes.payinTotal?.amount.toString(),
    payOutTotal: item.attributes.payoutTotal?.amount.toString(),
    currency: item.attributes.payinTotal?.currency,
    ...booking?.attributes,
    customerReview: customerReview?.attributes,
    providerReview: providerReview?.attributes,
  };

  if (!!customer) {

    customer.customerTransactions.push(enhancedItem);
  }
  if (!!provider) {
    provider.providerTransactions.push(enhancedItem);
  }
}

export const structureData = (data) => {
  console.log(data);

  const bookings = [];
  const reviews = [];
  const transactions = [];

  const users = data.reduce((users, item) => {
    console.log(item.type)
    if (item.type === 'user') {
      const enhancedItem = {
        ...item,
        ...item.attributes,
        ...item.attributes.profile,
        listings: [],
        bookings: [],
        reviews: [],
        providerTransactions: [],
        customerTransactions: [],
      }
      users.push(enhancedItem)
    } else if (item.type === 'listing') {
      console.log({ listing: item }, item.attributes.title)
      const user = existingItem(users, item.attributes.author)

      const enhancedItem = {
        ...item,
        ...item.attributes,
        ...item.attributes.publicData,
        ...item.attributes.protectedData,
        ...item.attributes.privateData,
      }

      user.listings.push(enhancedItem);
    } else if (item.type === 'transaction') {
      transactions.push(item);
      // console.log({ customer }, { provider })
      
    } else if (item.type === 'booking') {
      bookings.push(item)
    } else if (item.type === 'review') {
      reviews.push(item)
    }

    // console.log({ ...users})
    return users;
  }, []);

  transactions.forEach(tx => structureTransactions(users, bookings, reviews, tx))

  return users;
}
