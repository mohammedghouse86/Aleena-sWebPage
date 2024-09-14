"use server";

import { signIn, signOut } from "../../auth";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/Home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
/*
export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}*/

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadexpense(formData) {
  try {
    if(formData.get("date")!==""){
    const inputDate = formData.get("date")
    const date = new Date(inputDate);
    const isoString = date.toISOString(); 

    console.log('running uploadexpense', 
        'date = ',isoString,
        'category= ',formData.get("category"),
        'description= ',formData.get("description"),
        'unit= ',formData.get("unit"),
        'qty= ',formData.get("qty"),
        'unitcost= ',formData.get("unitcost"),
    )
  
  const total = formData.get("unitcost")*formData.get("qty")
    const response = await fetch(
      `http://localhost:3000/api/auth/ExpenseEntryAPI`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date:isoString,
          category: formData.get("category"),
          description: formData.get("description"),
          unit: formData.get("unit"),
          qty: formData.get("qty"),
          unitcost: formData.get("unitcost"),
          totalcost: total,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
  }
    else{
      console.log('running uploadexpense', 
        'category= ',formData.get("category"),
        'description= ',formData.get("description"),
        'unit= ',formData.get("unit"),
        'qty= ',formData.get("qty"),
        'unitcost= ',formData.get("unitcost"),
    )

    const total = formData.get("unitcost")*formData.get("qty")
    const response = await fetch(
      `http://localhost:3000/api/auth/ExpenseEntryAPI`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: formData.get("category"),
          description: formData.get("description"),
          unit: formData.get("unit"),
          qty: formData.get("qty"),
          unitcost: formData.get("unitcost"),
          totalcost: total,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    }
    
  } catch (error) {
    console.error(error);
  }
}

export async function getexpense() {
  try {
    //console.log('running uploadexpense')
    //console.log('this is formData =',formData.get("description"))
    const response = await fetch(
      `http://localhost:3000/api/auth/GetExpensesAPI`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteExpense(id) {
  try {
    console.log(id);
    const response = await fetch(
      `http://localhost:3000/api/auth/DeleteExpenseAPI`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:id})
      }
    );
    const json = await response.json();
    console.log(response);
    return json;
  } 
  catch (error) {
    //console.error(error);
    return { success: false, message: error.message };
  }
}

export async function editExpense(formdata, id) {
  try {
    console.log(id);
    const response = await fetch(
      `http://localhost:3000/api/auth/EditExpenseAPI`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id:id,
          category: formdata.get("category"),
          description: formdata.get("description"),
          unit: formdata.get("unit"),
          qty: formdata.get("qty"),
          unitcost: formdata.get("unitcost")
        }),
      }
    );
    const json = await response.json();
    console.log(response);
    return json;
  } 
  catch (error) {
    //console.error(error);
    return { success: false, message: error.message };
  }
}