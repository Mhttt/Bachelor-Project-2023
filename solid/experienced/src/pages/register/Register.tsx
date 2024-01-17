import { Component } from "solid-js";
import { Form, useField } from "solid-js-form";
import * as yup from "yup";
import { regsister } from "../../api/register";
import styles from "./Register.module.css";

interface InputProps {
    name: string;
    placeholder: string;
    type: string;
}

const Input: Component<InputProps> = ({ name, placeholder, type }) => {
    const { field, form } = useField(name);
    const formHandler = form.formHandler;

    return (
        <>
            <input
                name={name}
                type={type}
                //@ts-ignore
                value={field.value()}
                use:formHandler
                class={styles["form-field"]}
                placeholder={placeholder}
            />
            <span>{field.error()}</span>
        </>
    );
};

const INITIAL_VALUES = {
    username: "",
    password: "",
    email: "",
    repeatPassword: "",
};

const Register: Component = () => (
    <main class={styles.main}>
        <Form
            initialValues={INITIAL_VALUES}
            validation={
                {
                    username: yup
                        .string()
                        .min(6, "User name must be at least 6 characters")
                        .required("You need to enter a username"),
                    email: yup
                        .string()
                        .email("Invalid email address")
                        .required("You need to enter an email"),
                    password: yup
                        .string()
                        .min(6)
                        .required("You need to enter a password"),
                    repeatPassword: yup
                        .string()
                        .min(6)
                        .required("You need to enter a repeat password")
                        .oneOf([yup.ref("password")], "Passwords must match"),
                } as any
            }
            onSubmit={async (form: any) => {
                const response = await regsister(form.values);
                const data = await response.json();

                if (data.detail) {
                    alert(`Error: ${data.detail}`);
                    return;
                }

                if (response.ok) {
                    alert(
                        "You have successfully registered your account, congratulations!"
                    );
                    return;
                }

                alert("Something went wrong, please try again later");
            }}
        >
            <div class={styles.container}>
                <h2>REGISTER</h2>
                <p>Register to leave reviews and comments</p>
                <Input name="username" placeholder="Your name" type="text" />
                <Input name="email" placeholder="Your email" type="text" />
                <Input
                    name="password"
                    placeholder="Your password"
                    type="password"
                />
                <Input
                    name="repeatPassword"
                    placeholder="Repeat password"
                    type="password"
                />
                <button type="submit" class={styles["login-button"]}>
                    Login
                </button>
            </div>
        </Form>
    </main>
);

export default Register;
