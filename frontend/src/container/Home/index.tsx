import { Button, TransactionsTable, UsersTable, Input } from "components";
import { useEffect, useState } from "react";
import { Container } from "components";

export const HomeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [senderId, setSenderId] = useState<string>('');
  const [receiverId, setReceiverId] = useState<string>('');

  const { errors: userErrors } = useSelector((state: RootState) => state.user);
  const { errors: transactionErrors } = useSelector((state: RootState) => state.transaction);

  useEffect(() => {
    dispatch(AppActions.user.getUsers());
    dispatch(AppActions.transaction.getTransactions());
  }, [dispatch]);

  const createUser = () => {
    dispatch(AppActions.user.createUser({
      balance,
    }));
  }

  const send = () => {
    dispatch(AppActions.transaction.createTransaction({
      senderId,
      receiverId,
      amount,
      next: () => {
        dispatch(AppActions.user.getUsers());
      }
    }));
  }

  const onClearLogger = () => {
    dispatch(AppActions.user.resetErrors());
    dispatch(AppActions.transaction.resetErrors());
  }

  return (
    <div>
      <Container >
        <div className="contents">
          <div className="transactionGroup">
            <div className='input-group'>
              <span></span>
              <Input type='text' placeholder='sender ID' value={senderId} onChange={e => setSenderId(e.target.value)} />
              <Input type='text' placeholder='receiver ID' value={receiverId} onChange={e => setReceiverId(e.target.value)} />
              <Input className='' type='number' placeholder='amount' value={amount} onChange={e => setAmount(+e.target.value)} />
              <Button
                type='button'
                onClick={send}
              >
                Send
              </Button>
            </div>
            <TransactionsTable />
          </div>
          <div className="userGroup">
            <div className='input-group'>
              <label>Balance</label>
              <Input className='' type='number' placeholder='balance' value={balance} onChange={e => setBalance(+e.target.value)} />
              <Button
                type='button'
                onClick={createUser}
              >
                Create new User
              </Button>
            </div>
            <UsersTable />
          </div>
        </div>
        <div className='error-logger'>
          <p>Error Logger</p>
          <Button
            type='button'
            onClick={onClearLogger}
          >
            Clear
          </Button>
          <div className='errors'>
            <div className='user-errors'>
              {
                userErrors.length > 0 &&
                <>
                  <span>User Errors</span>
                  <ul>
                    {
                      userErrors.map((el, index) => <li key={index}>{el}</li>)
                    }
                  </ul>
                </>
              }
            </div>
            <div className='transaction-errors'>
              {
                transactionErrors.length > 0 &&
                <>
                  <span>Transaction Errors</span>
                  <ul>
                    {
                      transactionErrors.map((el, index) => <li key={index}>{el}</li>)
                    }
                  </ul>
                </>
              }
            </div>
          </div>
        </div>
      </Container>

    </div>
  )
}