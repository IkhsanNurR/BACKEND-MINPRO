create table users.business_entity(
entity_id serial primary key
)

create table users.users(
user_entity_id serial primary key
)

create table payment.bank(
bank_entity_id integer primary key references users.business_entity(entity_id),	
bank_code varchar(10) unique,
bank_name varchar(55) unique,
bank_modified_date timestamptz default now()
)

create table payment.fintech(
fint_entity_id integer primary key references users.business_entity(entity_id),
fint_code varchar(10) unique,
fint_name varchar(55) unique,
fint_modified_date timestamptz default now()
)

create table payment.users_account(
usac_bank_entity_id integer references payment.bank(bank_entity_id),
usac_user_entity_id integer references users.users(user_entity_id),
usac_fint_entity_id integer references payment.fintech(fint_entity_id),
usac_account_number varchar(25) unique,
usac_saldo numeric,
usac_type varchar(15) CHECK (usac_type in('debet','credit card','payment')),
usac_start_date date,
usac_end_date date,
usac_modified_date timestamptz default now(),
usac_status varchar(15) CHECK (usac_status in('active','inactive','blokir'))
)

create table payment.transaction_payment(
trpa_id serial primary key,
trpa_code_number varchar(55) unique,
trpa_order_number varchar(25),
trpa_debet numeric,
trpa_credit numeric,
trpa_type varchar (15) CHECK (trpa_type in('topup','transfer','order','refund')),
trpa_note varchar(255),
trpa_modified_date timestamptz default now(),
trpa_source_id varchar (25) NOT NULL,
trpa_target_id varchar (25) NOT NULL,
trpa_user_entity_id integer references users.users(user_entity_id)
)

UPDATE payment.transaction_payment AS tp
SET trpa_source_id = ua_source.usac_account_number,
    trpa_target_id = ua_target.usac_account_number
FROM payment.users_account AS ua_source, payment.users_account AS ua_target
WHERE tp.trpa_source_id = ua_source.usac_user_entity_id::varchar
  AND tp.trpa_target_id = ua_target.usac_user_entity_id::varchar;


CREATE OR REPLACE PROCEDURE payment.insertbank(In data JSON)
LANGUAGE plpgsql
AS $$
DECLARE 
    new_bank_entity_id INT;
BEGIN
    INSERT INTO payment.bank (bank_entity_id, bank_code, bank_name)
    SELECT entity_id, bank_code, bank_name
    FROM (
        SELECT COALESCE(MAX(bank_entity_id), 0) + 1 AS entity_id
        FROM payment.bank
    ) AS bank_id,
    json_to_recordset(data) bank (bank_code VARCHAR, bank_name VARCHAR);

    GET DIAGNOSTICS new_bank_entity_id = ROW_COUNT;

    RAISE NOTICE 'Inserted % bank entities.', new_bank_entity_id;
END $$;


CREATE OR REPLACE PROCEDURE payment.insertfintech(In data JSON)
LANGUAGE plpgsql
AS $$
DECLARE 
    new_fint_entity_id INT;
BEGIN
    INSERT INTO payment.fintech (fint_entity_id, fint_code, fint_name)
    SELECT entity_id, fint_code, fint_name
    FROM (
        SELECT COALESCE(MAX(fint_entity_id), 0) + 1 AS entity_id
        FROM payment.fintech
    ) AS fint_id,
    json_to_recordset(data) fintech (fint_code VARCHAR, fint_name VARCHAR);

    GET DIAGNOSTICS new_fint_entity_id = ROW_COUNT;

    RAISE NOTICE 'Inserted % fintech entities.', new_fint_entity_id;
END $$;


create or replace procedure payment.updateBank(in data json)
language plpgsql
as 
$$
declare
	data_store record;
begin
	select * from json_to_recordset(data) as x(entity_id INT,bank_code VARCHAR,bank_name varchar) into data_store;
	update payment.bank 
	set bank_code=data_store.bank_code,bank_name=data_store.bank_name where bank_entity_id=data_store.entity_id;
end;
$$;


create or replace procedure payment.updatefintech(in data json)
language plpgsql
as 
$$
declare
	data_store record;
begin
	select * from json_to_recordset(data) as x(entity_id INT,fint_code VARCHAR,fint_name varchar) into data_store;
	update payment.fintech 
	set fint_code=data_store.fint_code,fint_name=data_store.fint_name where fint_entity_id=data_store.entity_id;
end;
$$;


CREATE OR REPLACE PROCEDURE payment.createUserAccountWEntity(
    IN p_entity_type VARCHAR(10), -- "bank" or "fintech"
    IN p_entity_id INT,
    IN p_user_entity_id INT,
    IN p_account_number VARCHAR(25),
    IN p_saldo NUMERIC,
    IN p_type VARCHAR(15),
    IN p_status VARCHAR(15)
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_entity_type = 'bank' THEN
        INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
        VALUES (p_entity_id, p_user_entity_id, p_account_number, p_saldo, p_type, p_status);
    ELSIF p_entity_type = 'fintech' THEN
        INSERT INTO payment.users_account (usac_fint_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
        VALUES (p_entity_id, p_user_entity_id, p_account_number, p_saldo, p_type, p_status);
    ELSE
        -- Handle invalid entity type
        RAISE EXCEPTION 'Invalid entity type';
    END IF;
    
    COMMIT;
END $$;



CREATE OR REPLACE PROCEDURE payment.createUserAccountWFintech(
	IN p_fint_entity_id integer,
    IN p_user_entity_id integer,
    IN p_account_number varchar(25),
    IN p_saldo numeric,
    IN p_type varchar(15),
    IN p_status varchar(15)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO payment.users_account (usac_fint_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    VALUES (p_fint_entity_id, p_user_entity_id, p_account_number, p_saldo, p_type, p_status);
    
    COMMIT;
END;
$$;


CREATE OR REPLACE PROCEDURE payment.createUserAccountWBank(
    IN p_user_entity_id integer,
    IN p_bank_entity_id integer,
    IN p_account_number varchar(25),
    IN p_saldo numeric,
    IN p_type varchar(15),
    IN p_status varchar(15)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    VALUES (p_bank_entity_id, p_user_entity_id, p_account_number, p_saldo, p_type, p_status);
    
    COMMIT;
END;
$$;


CREATE OR REPLACE FUNCTION payment.generate_transaction_code() RETURNS VARCHAR(50)
AS $$
DECLARE
    dateNow VARCHAR(10);
    lastTransactionCode VARCHAR(50);
    lastSerialNumber INT;
    paddedSerialNumber VARCHAR(4);
    transactionCode VARCHAR(50);
BEGIN
    dateNow := to_char(CURRENT_DATE, 'YYYYMMDD');

    SELECT trpa_code_number INTO lastTransactionCode
    FROM payment.transaction_payment
    ORDER BY trpa_code_number DESC
    LIMIT 1;

    lastSerialNumber := 1;
    IF lastTransactionCode IS NOT NULL THEN
        lastSerialNumber := CAST(SUBSTRING(lastTransactionCode FROM '[0-9]+$') AS INTEGER) + 1;
    END IF;

    paddedSerialNumber := LPAD(CAST(lastSerialNumber AS VARCHAR), 4, '0');
    transactionCode := 'TRX#' || dateNow || '-' || paddedSerialNumber;

    RETURN transactionCode;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE payment.Topup(
    IN p_usac_account_number_bank VARCHAR(25),
    IN p_usac_account_number_fintech VARCHAR(25),
    IN p_credit numeric,
    IN p_trpa_type varchar(15)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_bank_entity_id integer;
    v_user_entity_id integer;
    v_fint_entity_id integer;
    v_bank_saldo numeric;
    v_fint_saldo numeric;
    v_trpa_code_number varchar(50);
BEGIN
    -- Mendapatkan informasi bank dari usac_account_number_bank
    SELECT usac_bank_entity_id, usac_user_entity_id, usac_saldo,
           usac_user_entity_id AS v_user_entity_id
    INTO v_bank_entity_id, v_user_entity_id, v_bank_saldo
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_bank;

    -- Mengecek apakah saldo mencukupi
    IF v_bank_saldo < p_credit THEN
        RAISE EXCEPTION 'Saldo tidak mencukupi';
    END IF;

    -- Mendapatkan kode transaksi menggunakan fungsi payment.generate_transaction_code()
    SELECT payment.generate_transaction_code()
    INTO v_trpa_code_number;

    SELECT usac_user_entity_id, usac_fint_entity_id
    INTO v_user_entity_id, v_fint_entity_id
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_fintech;

    -- Mendapatkan saldo bank sebelum transaksi
    SELECT usac_saldo INTO v_bank_saldo
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_bank;

    -- Mengupdate nilai trpa_debet dengan saldo bank sebelum transaksi
    v_bank_saldo := v_bank_saldo - p_credit;

    -- Memasukkan data transaksi ke dalam tabel payment.transaction_payment
    INSERT INTO payment.transaction_payment (trpa_code_number, trpa_debet, trpa_credit, trpa_type, trpa_source_id, trpa_target_id, trpa_user_entity_id)
    VALUES (v_trpa_code_number, v_bank_saldo, p_credit, p_trpa_type, p_usac_account_number_bank, p_usac_account_number_fintech, v_user_entity_id);

    -- Memperbarui saldo bank
    UPDATE payment.users_account
    SET usac_saldo = usac_saldo - p_credit,
        usac_modified_date = now()
    WHERE usac_account_number = p_usac_account_number_bank
    RETURNING usac_saldo INTO v_bank_saldo;

    -- Memperbarui saldo fintech
    UPDATE payment.users_account
    SET usac_saldo = usac_saldo + p_credit,
        usac_modified_date = now()
    WHERE usac_account_number = p_usac_account_number_fintech
    RETURNING usac_saldo INTO v_fint_saldo;

    -- Jika bank entity ID dan fintech entity ID berbeda, maka perlu dilakukan transfer antar bank
    IF v_bank_entity_id != v_fint_entity_id THEN
        -- Perbarui saldo bank fintech
        UPDATE payment.users_account
        SET usac_saldo = usac_saldo - p_credit,
            usac_modified_date = now()
        WHERE usac_account_number = p_usac_account_number_bank
        AND usac_bank_entity_id = v_bank_entity_id
        RETURNING usac_saldo INTO v_bank_saldo;

        -- Perbarui saldo fintech
        UPDATE payment.users_account
        SET usac_saldo = usac_saldo + p_credit,
            usac_modified_date = now()
        WHERE usac_account_number = p_usac_account_number_fintech
        AND usac_bank_entity_id = v_fint_entity_id
        RETURNING usac_saldo INTO v_fint_saldo;
    END IF;

    -- Insert bank account record if it doesn't exist
    INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    SELECT v_bank_entity_id, v_user_entity_id, p_usac_account_number_bank, v_bank_saldo - p_credit, 'debet', 'active'
    WHERE NOT EXISTS (
        SELECT 1
        FROM payment.users_account
        WHERE usac_account_number = p_usac_account_number_bank
    );

    -- Insert fintech account record if it doesn't exist
    INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    SELECT v_fint_entity_id, v_user_entity_id, p_usac_account_number_fintech, v_fint_saldo + p_credit, 'kredit', 'active'
    WHERE NOT EXISTS (
        SELECT 1
        FROM payment.users_account
        WHERE usac_account_number = p_usac_account_number_fintech
    );

    -- Mengembalikan kode transaksi
    PERFORM v_trpa_code_number;
END;
$$;



CREATE OR REPLACE VIEW payment.transaction_history AS
SELECT
    trpa_code_number,
    trpa_modified_date,
    trpa_debet,
    trpa_credit,
    trpa_note,
    trpa_source_id,
    trpa_target_id,
    trpa_type,
    CONCAT(u.user_first_name, ' ', u.user_last_name) AS User
FROM
    payment.transaction_payment tp
JOIN
    users.users u ON tp.trpa_user_entity_id = u.user_entity_id;


--jika ingin menampilkan note trpa_note:
CREATE OR REPLACE PROCEDURE payment.Topup(
    IN p_usac_account_number_bank VARCHAR(25),
    IN p_usac_account_number_fintech VARCHAR(25),
    IN p_credit numeric,
    IN p_trpa_type varchar(15),
    IN p_trpa_note varchar(255)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_bank_entity_id integer;
    v_user_entity_id integer;
    v_fint_entity_id integer;
    v_bank_saldo numeric;
    v_fint_saldo numeric;
    v_trpa_code_number varchar(50);
BEGIN
    -- Mendapatkan informasi bank dari usac_account_number_bank
    SELECT usac_bank_entity_id, usac_user_entity_id, usac_saldo,
           usac_user_entity_id AS v_user_entity_id
    INTO v_bank_entity_id, v_user_entity_id, v_bank_saldo
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_bank;

    -- Mengecek apakah saldo mencukupi
    IF v_bank_saldo < p_credit THEN
        RAISE EXCEPTION 'Saldo tidak mencukupi';
    END IF;

    -- Mendapatkan kode transaksi menggunakan fungsi payment.generate_transaction_code()
    SELECT payment.generate_transaction_code()
    INTO v_trpa_code_number;

    SELECT usac_user_entity_id, usac_fint_entity_id
    INTO v_user_entity_id, v_fint_entity_id
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_fintech;

    -- Mendapatkan saldo bank sebelum transaksi
    SELECT usac_saldo INTO v_bank_saldo
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_bank;

    -- Mengupdate nilai trpa_debet dengan saldo bank sebelum transaksi
    v_bank_saldo := v_bank_saldo - p_credit;

    -- Memasukkan data transaksi ke dalam tabel payment.transaction_payment
    INSERT INTO payment.transaction_payment (trpa_code_number, trpa_debet, trpa_credit, trpa_type, trpa_note, trpa_source_id, trpa_target_id, trpa_user_entity_id)
    VALUES (v_trpa_code_number, v_bank_saldo, p_credit, p_trpa_type, p_trpa_note, p_usac_account_number_bank, p_usac_account_number_fintech, v_user_entity_id);

    -- Memperbarui saldo bank
    UPDATE payment.users_account
    SET usac_saldo = usac_saldo - p_credit,
        usac_modified_date = now()
    WHERE usac_account_number = p_usac_account_number_bank
    RETURNING usac_saldo INTO v_bank_saldo;

    -- Memperbarui saldo fintech
    UPDATE payment.users_account
    SET usac_saldo = usac_saldo + p_credit,
        usac_modified_date = now()
    WHERE usac_account_number = p_usac_account_number_fintech
    RETURNING usac_saldo INTO v_fint_saldo;

    -- Jika bank entity ID dan fintech entity ID berbeda, maka perlu dilakukan transfer antar bank
    IF v_bank_entity_id != v_fint_entity_id THEN
        -- Perbarui saldo bank fintech
        UPDATE payment.users_account
        SET usac_saldo = usac_saldo - p_credit,
            usac_modified_date = now()
        WHERE usac_account_number = p_usac_account_number_bank
        AND usac_bank_entity_id = v_bank_entity_id
        RETURNING usac_saldo INTO v_bank_saldo;

        -- Perbarui saldo fintech
        UPDATE payment.users_account
        SET usac_saldo = usac_saldo + p_credit,
            usac_modified_date = now()
        WHERE usac_account_number = p_usac_account_number_fintech
        AND usac_bank_entity_id = v_fint_entity_id
        RETURNING usac_saldo INTO v_fint_saldo;
    END IF;

    -- Insert bank account record if it doesn't exist
    INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    SELECT v_bank_entity_id, v_user_entity_id, p_usac_account_number_bank, v_bank_saldo - p_credit, 'debet', 'active'
    WHERE NOT EXISTS (
        SELECT 1
        FROM payment.users_account
        WHERE usac_account_number = p_usac_account_number_bank
    );

    -- Insert fintech account record if it doesn't exist
    INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    SELECT v_fint_entity_id, v_user_entity_id, p_usac_account_number_fintech, v_fint_saldo + p_credit, 'kredit', 'active'
    WHERE NOT EXISTS (
        SELECT 1
        FROM payment.users_account
        WHERE usac_account_number = p_usac_account_number_fintech
    );

    -- Mengembalikan kode transaksi
    PERFORM v_trpa_code_number;
END;
$$;
