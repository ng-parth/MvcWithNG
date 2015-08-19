<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MailMe.aspx.cs" Inherits="MvcWithNG.Apps.PrintMe.MailMe" %>

<%@ Import Namespace="System.Web.Mail" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Mail Form Example</title>
</head>
<body>

    <h4>Send a new mail message:</h4>
    <form id="form1" method="Post" action="MailForm.aspx" runat="server">
        <table style="width: 350; background-color: #FFFF99">
            <tr>
                <td align="Right"><b>To:</b></td>
                <td>
                    <asp:TextBox ID="txtTo" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>From:</b></td>
                <td>
                    <asp:TextBox ID="txtFrom" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>Subject:</b></td>
                <td>
                    <asp:TextBox ID="txtSubject" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>MessageBody:</b></td>
                <td>
                    <asp:TextBox ID="txtBody" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>Attachments:</b></td>
                <td>
                    <asp:TextBox ID="txtAttach" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>CC:</b></td>
                <td>
                    <asp:TextBox ID="txtBcc" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>BCC:</b></td>
                <td>
                    <asp:TextBox ID="txtCc" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>BodyEncoding:</b></td>
                <td>
                    <asp:TextBox ID="txtBodyEncoding" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>BodyFormat:</b></td>
                <td>
                    <asp:TextBox ID="txtBodyFormat" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>Priority:</b></td>
                <td>
                    <asp:TextBox ID="txtPriority" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>URL Content Base:</b></td>
                <td>
                    <asp:TextBox ID="txtUrlContentBase" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>URL Content Location:</b></td>
                <td>
                    <asp:TextBox ID="txtUrlContentLocation" runat="server" /></td>
            </tr>
            <tr>
                <td align="Right"><b>Mail Server:</b></td>
                <td>
                    <asp:TextBox ID="txtMailServer" runat="server" /></td>
            </tr>
        </table>
        <br />

        <asp:Button ID="btnSubmit" Text="Submit" OnClick="btnSubmit_Click" runat="server" />
        <asp:Button ID="btnClear" Text="Clear" OnClick="btnClear_Click" runat="server" />
        <p>
            <asp:Label ID="lblMsg1" runat="server" /></p>
    </form>
</body>
</html>
