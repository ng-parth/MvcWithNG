using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mail;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MvcWithNG.Apps.PrintMe
{
    public partial class MailMe : System.Web.UI.Page
    {
        void Page_Load()
        {
            if (!IsPostBack)
            {
                txtTo.Text = "john@contoso.com";
                txtFrom.Text = "marsha@contoso.com";
                txtCc.Text = "fred@contoso.com";
                txtBcc.Text = "wilma@contoso.com";
                txtSubject.Text = "Hello";
                txtBody.Text = "This is a test message.";
                txtAttach.Text = @"C:\Documents and Settings\All Users\Documents\My Pictures\Sample Pictures\Sunset.jpg,"
                   + @"C:\Documents and Settings\All Users\Documents\My Pictures\Sample Pictures\Winter.jpg";
                txtBodyEncoding.Text = Encoding.ASCII.EncodingName;
                txtBodyFormat.Text = "HTML";
                txtPriority.Text = "Normal";
                txtUrlContentBase.Text = "http://www.contoso.com/images";
                txtUrlContentLocation.Text = "http://www.contoso.com/images";
                // Name of relay mail server in your domain.
                txtMailServer.Text = "smarthost";
            }
        }

        void btnSubmit_Click(Object sender, EventArgs e)
        {
            string sTo, sFrom, sSubject, sBody;
            string sAttach, sCc, sBcc, sBodyEncoding;
            string sBodyFormat, sMailServer, sPriority;
            string sUrlContentBase, sUrlContentLocation;
            int iLoop1;

            sTo = txtTo.Text.Trim();
            sFrom = txtFrom.Text.Trim();
            sSubject = txtSubject.Text.Trim();
            sBody = txtBody.Text.Trim();
            sAttach = txtAttach.Text.Trim();
            sCc = txtCc.Text.Trim();
            sBcc = txtBcc.Text.Trim();
            sBodyFormat = txtBodyFormat.Text.Trim();
            sBodyEncoding = txtBodyEncoding.Text.Trim();
            sPriority = txtPriority.Text.Trim();
            sUrlContentBase = txtUrlContentBase.Text.Trim();
            sUrlContentLocation = txtUrlContentLocation.Text.Trim();
            sMailServer = txtMailServer.Text.Trim();

            MailMessage MyMail = new MailMessage();
            MyMail.From = sFrom;
            MyMail.To = sTo;
            MyMail.Subject = sSubject;
            MyMail.Body = sBody;
            MyMail.Cc = sCc;
            MyMail.Bcc = sBcc;
            MyMail.UrlContentBase = sUrlContentBase;
            MyMail.UrlContentLocation = sUrlContentLocation;

            if (txtBodyEncoding.Text == Encoding.UTF7.EncodingName)
                MyMail.BodyEncoding = Encoding.UTF7;
            else if (txtBodyEncoding.Text == Encoding.UTF8.EncodingName)
                MyMail.BodyEncoding = Encoding.UTF8;
            else
                MyMail.BodyEncoding = Encoding.ASCII;

            switch (sBodyFormat.ToUpper())
            {
                case "HTML":
                    MyMail.BodyFormat = MailFormat.Html;
                    break;
                default:
                    MyMail.BodyFormat = MailFormat.Text;
                    break;
            }

            switch (sPriority.ToUpper())
            {
                case "HIGH":
                    MyMail.Priority = MailPriority.High;
                    break;
                case "LOW":
                    MyMail.Priority = MailPriority.Low;
                    break;
                default:
                    MyMail.Priority = MailPriority.Normal;
                    break;
            }

            // Build an IList of mail attachments.
            if (sAttach != "")
            {
                char[] delim = new char[] { ',' };
                foreach (string sSubstr in sAttach.Split(delim))
                {
                    MailAttachment MyAttachment = new MailAttachment(sSubstr);
                    MyMail.Attachments.Add(MyAttachment);
                }
            }

            SmtpMail.SmtpServer = sMailServer;
            SmtpMail.Send(MyMail);
            lblMsg1.Text = "C# Message sent to " + MyMail.To;
        }

        void btnClear_Click(Object sender, EventArgs e)
        {
            lblMsg1.Text = "";
            txtTo.Text = "";
            txtFrom.Text = "";
            txtSubject.Text = "";
            txtBody.Text = "";
            txtAttach.Text = "";
            txtBcc.Text = "";
            txtCc.Text = "";
            txtBodyEncoding.Text = "";
            txtBodyFormat.Text = "";
            txtPriority.Text = "";
            txtUrlContentBase.Text = "";
            txtUrlContentLocation.Text = "";
            txtMailServer.Text = "";
            btnSubmit.Text = "Submit";
        }
    }
}